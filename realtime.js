var io = require('socket.io'),
    express = require('express'),
    config = require('./config'),
    persistency = require('./persistency'),
    parseCookie = require('connect').utils.parseCookie;

var online = {};
var title = config.app.defaultTitle;
var PING_INTERVAL = 5 * 60 * 1000; // 5 min
var MAX_LATENCY = 10 * 1000; // 10 sec

setInterval(function() {
  broadcast('ping');
}, PING_INTERVAL);

function broadcast(type, body) {
  var toDelete = [];
  var now = new Date().getTime();
  for (id in online) {
    if (online[id].disconnected || now - online[id].lastPong > PING_INTERVAL + MAX_LATENCY) {
      toDelete.push(id);
    } else {
      online[id].emit(type, body);
    }
  }
  if (toDelete.length > 0) {
    for (i in toDelete) {
      online[toDelete[i]].disconnect();
      delete online[toDelete[i]]; 
    }
    broadcast('clients', packClients());
  }
}

function packClients() {
  clients = [];
  now = new Date().getTime();
  for (id in online) {
    user = online[id].user;
    if (user.idle) {
      user.idleFor = now - user.idle; 
    }
    clients.push(user);
  }
  return clients;
}

function pushSystemMessage(hexcolor, message) {
  handleMessage(persistency.SERVUSTALK_USER, '/#' + hexcolor + ' ' + message);
}

function disconnectUser(userId) {
  var toDelete = [];
  for (id in online) {
    if (online[id].user.id === userId) {
      toDelete.push(id);
    }
  }
  if (toDelete.length > 0) {
    for (i in toDelete) {
      online[toDelete[i]].disconnect();
      delete online[toDelete[i]]; 
    }
    broadcast('clients', packClients());
  }
}

function handleMessage(user, message, type) {
  var completeMessage = {
    user: user,
    text: message, 
    type: (type ? type : "TEXT"),
    ts: new Date().getTime(),
  }
  persistency.saveMessage(completeMessage);
  broadcast('message', completeMessage);
}

function init(app, sessionStore) {
    persistency.getTitle(function(err, titles) {
        if (err) {
            console.warn('Error getting title: ' + err, err.stack);
        } else {
            if (titles.length == 0) {
                title = config.app.defaultTitle;
            } else {
                title = titles[0];
            }
        }
    });

    var sio = io.listen(app);
    sio.configure(function(){
      sio.set('log level', config.app.sio.log_level);
      sio.set('transports', config.app.sio.transports);
    });


    // customize authorization to transmit express session to socket.io via handshake data
    sio.set('authorization', function (data, accept) {
      if (data.headers.cookie) {
        data.cookie = parseCookie(data.headers.cookie);
        data.sessionID = data.cookie['express.sid'];
        // (literally) get the session data from the session store
        sessionStore.get(data.sessionID, function (err, session) {
          if (err || !session) {
            // if we cannot grab a session, turn down the connection
            accept('Cannot grab session', false);
          } else {
            if (session.auth) {
              // check if user is whitelisted
              persistency.isUserWhitelisted(session.auth.google.user.id, function(whitelisted) {
                if (whitelisted) {
                  // save the session data and accept the connection
                  data.session = session;
                  accept(null, true);
                } else {
                  accept('User not whitelisted', false);
                }
              });
            } else {
              return accept('Not authenticated', false);
            }
          }
        });
      } else {
        return accept('No cookie transmitted.', false);
      }
    });

    sio.sockets.on('connection', function(socket) {
      if (socket.handshake.session.auth) {
        socket.user = socket.handshake.session.auth.google.user;
        socket.user.idle = false;
        online[socket.id] = socket;
        broadcast('clients', packClients());

        persistency.getHistory(config.app.history_size, function(err, messages) {
          if (err) {
              console.warn('Error getting history: ' + err, err.stack);
          } else {
            persistency.mergeMessagesWithUsers(messages, null, function(messages) {
              history = messages.reverse();
              socket.emit('history', history);
            });
          }
        });

        socket.lastPong = new Date().getTime();
        socket.emit('ping');

        socket.on('pong', function() {
          socket.lastPong = new Date().getTime();
        });

        socket.on('message', function(message) {
          handleMessage(socket.user, message);
        });

        socket.on('disconnect', function() {
          delete online[socket.id];
          broadcast('clients', packClients());
        });

        socket.on('loadTitle', function() {
            socket.emit('loadTitle', title); 
        });

        socket.on('updateTitle', function(newTitle) { 
            title = {
              text: newTitle,
              user: socket.user.name,
              ts: new Date().getTime()
            };
            broadcast('updateTitle', title);

            title.user = socket.user.id;
            persistency.saveTitle(title);
        });

        socket.on('idle', function(data) {
          socket.user.idle = new Date().getTime() - data.since;
          broadcast('clients', packClients());
        });

        socket.on('not idle', function() {
          socket.user.idle = false;
          broadcast('clients', packClients());
        });

        socket.on('location', function(newLocation) {
          socket.user.location = newLocation;
          broadcast('clients', packClients());
        });
        socket.on('checkin', function(loc) {
          handleMessage(socket.user, loc, "CHECKIN");
        });
      } else {
        socket.disconnect();
      }
    });

}

exports.init = init
exports.broadcast = broadcast
exports.pushSystemMessage = pushSystemMessage
exports.disconnectUser = disconnectUser

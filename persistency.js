var Mongolian = require("mongolian"),
    jQuery = require('jquery');

var server = new Mongolian

var db = server.db("ubuntalk")

var messages = db.collection("messages")
var users = db.collection("users")
var titles = db.collection("titles")

function mergeMessagesWithUsers(messages, users, callback) {
  merge = function(messages, users) {
    // Maps user_id -> user
    users_by_id = {};
    for (idx in users) {
      users_by_id[users[idx].id] = users[idx];
    }

    // message.user contains id, but we need a user object
    for (idx in messages) {
      messages[idx].user = users_by_id[messages[idx].user];
    }

    callback(messages);
  };

  if (users == null) {
    getUsers(function(err, users) {
      if (err) {
        console.warn('Error getting users: ' + err, err.stack);
      } else {
        merge(messages, users);
      }
    });
  } else {
    merge(messages, users);
  }
}

function init() {
  users.ensureIndex({id: 1});
  messages.ensureIndex({ts: 1});
  titles.ensureIndex({ts: 1});
}

function saveMessage(message) {
  msg = {
    user: message.user.id,
    text: message.text,
    ts: message.ts
  }
  messages.insert(msg);
}

function getMessages(lower_date, upper_date, callback) {
  messages.find({ts: { $gt: lower_date.getTime(), $lt: upper_date.getTime()} }, { _id : 0 }).toArray(callback);
}

function updateUser(id, properties) {
  users.update({id: id}, {$set: properties});
}

function saveUser(user) {
  users.findOne({id: user.id}, {_id : 0}, function(err, db_user) {
    if (!err) {
      if (db_user === undefined) {
        // First time user, save it
        users.insert(user);
      } else {
        // Update existing user
        jQuery.extend(true, db_user, user);
        users.insert(db_user);
      }
    } else {
      console.warn('Error searching for user: ' + err);
    }
  });
}

function getHistory(count, callback) {
  messages.find({}, {_id : 0}).limit(count).sort({ts: -1}).toArray(callback);
}

function getUser(id, callback) {
  users.findOne({id: id}, {_id : 0}, callback);
}

function getUsers(callback) {
  users.find({}, {_id : 0}).toArray(callback);
}

function saveTitle(title) {
  titles.insert(title);
}

function getTitle(callback) {
  titles.find({}, {_id : 0}).sort({ts: -1}).limit(1).toArray(callback);
}

exports.mergeMessagesWithUsers = mergeMessagesWithUsers
exports.init = init
exports.saveMessage = saveMessage
exports.getMessages = getMessages
exports.updateUser = updateUser
exports.saveUser = saveUser
exports.getHistory = getHistory
exports.getUser = getUser
exports.getUsers = getUsers
exports.saveTitle = saveTitle
exports.getTitle = getTitle

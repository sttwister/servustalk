var persistency = require('./persistency'),
    date_utils = require('date-utils'),
    everyauth = require('everyauth'),
    config = require('./config'),
    util = require('util');

function index(req, res) {
  if (!req.loggedIn) {
    res.render('login'); 
  } else {
    console.log(req.session.auth.google.user.name);
    res.render('index', {
      calendar_web_link: config.calendar.web_link
    });
  }
}

function history(req, res) {
  if (!req.loggedIn) {
    res.redirect('/'); 
  } else {
    res.render('history');
  }
}

function getHistory(req, res) {
  if (!req.loggedIn) {
    res.redirect('/'); 
  } else {
    year = parseInt(req.params.year);
    month = parseInt(req.params.month);
    day = parseInt(req.params.day);
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      res.render('404');
      return;
    }

    if (!Date.validateDay(day, year, month)) {
      res.render('404');
      return;
    }

    lower_date = new Date(year, month, day, 0, 0, 0, 0);
    upper_date = lower_date.clone();
    upper_date.addDays(1);

    data = {};
    persistency.getMessages(lower_date, upper_date, function(err, messages) {
      if (err) {
        console.warn('Error getting messages: ' + err, err.stack);
        res.render('404');
      } else {
        persistency.getUsers(function(err, users) {
          if (err) {
            console.warn('Error getting users: ' + err, err.stack);
            res.render('404');
          } else {
            data.messages = messages;
            data.users = users;
            res.contentType('json');
            res.send(data);
          }
        });
      }
    });
  }
}

function beta(req, res) {
  if (!req.loggedIn) {
    res.redirect('/'); 
  } else {
    res.render('beta', {
      calendar_web_link: config.calendar.web_link
    });
  }
}

exports.index = index
exports.history = history
exports.getHistory = getHistory
exports.beta = beta

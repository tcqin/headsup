// libraries
const http = require('http');
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const fs = require('fs');
const path = require('path');

// initialize the express app
const app = express();
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

// local dependencies
const api = require('./routes/api');
const db = require('./db');

// set the paths
app.set('views', path.join(__dirname, '/views'));

// required for passport
app.use(session({
  secret: '2]-d=s84hfnsg2934.v/s[ak198fnba]',
  saveUninitialized: true,
  resave: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// set routes
app.use('/api', api);
app.use('/static', express.static('public'));
require('./config/passport')(passport);
require('./routes/views.js')(app, passport);

// refresh users
const User = require('./models/user');
User.find({}, function(err, users) {
  for (let i = 0; i < users.length; i++) {
    var user = users[i]
    user.online = false;
    user.save(function(err) {
      if (err) throw err;
    });
  };
});

const port = 5186;
const server = http.Server(app);

// set up socket
const io = require('socket.io')(server);
io.on('connection', function(socket){

  console.log('Client connected.');

  socket.on('user-login', function(data) {
    socket.username = data;
    io.emit('user-login', data);
  });

  socket.on('user-logout', function(data) {
    io.emit('user-disconnect', data);
  });

  socket.on('home-page-chat-message', function(data) {
    io.emit('home-page-chat-message', data);
  });

  socket.on('disconnect', function() {
    io.emit('user-disconnect', socket.username);
    console.log('Client disconnected.');
  });

});

// deploy server
server.listen((process.env.PORT || port), function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

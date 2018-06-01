// libraries
const https = require('https');
const express = require('express');
const session = require('express-session');
const fs = require('fs');

// local dependencies
const views = require('./routes/views');
const api = require('./routes/api');
const db = require('./db');
const passport = require('./config/passport');

// initialize the express app
const app = express();

// set up sessions
app.use(session({
  cookieName: 'session',
  secret: '2]-d=s84hfnsg2934.v/s[ak198fnba]',
  resave: 'false',
  saveUninitialized: 'true'
}));

// hook up passport
app.use(passport.initialize());
app.use(passport.session());

// set routes
app.use('/', views);
app.use('/api', api);
app.use('/static', express.static('public'));

// set port and server
const options = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.crt")
}

const port = 5186;
const server = https.Server(options, app);

server.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

// libraries
const http = require('http');
const express = require('express');
const session = require('express-session');


// local dependencies
const views = require('./routes/views');
const db = require('./db');
const passport = require('./passport');

// initialize the express app
const app = express();

// hook up passport
app.use(passport.initialize());
app.use(passport.session());

// link to facebook
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/'
  }),
  function(req, res) {
    res.redirect('/');
  }
);

// set routes
app.use('/', views);

// set port and server
const port = 5186;
const server = http.Server(app);

server.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

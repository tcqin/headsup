// dependencies
const express = require('express');
const router = express.Router();

// local dependencies
const db = require('../db');
const passport = require('../config/passport');

// models
const User = require('../models/user');

// public endpoints
router.get('/', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/home');
  } else {
    res.sendFile('index.html', { root: 'src/views'});
  }
});

router.get('/home', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.sendFile('home.html', { root: 'src/views'});
  } else {
    res.redirect('/');
  }
});

// link to facebook
router.get('/auth/facebook', passport.authenticate('facebook', {
  scope: ['public_profile']
}));
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/home',
    failureRedirect: '/',
  }),
  function(req, res) {
    res.redirect('/');
  }
);

// route for logging out
router.get('/logout', function(req, res) {
  console.log(req.user);

  User.update({facebook: req.user.facebook},
    {online: false}, function(err,count,status) {
    if (err) console.log(err);
  });

  req.logout();
  res.redirect('/');
});

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;

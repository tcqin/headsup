// dependencies
const express = require('express');
const passport = require('passport');

// models
const User = require('../models/user');
const Hand = require('../models/hand');

// export router
const router = express.Router();

///////////////////
// API endpoints //
///////////////////

router.get('/users', function(req, res) {
  User.find(req.query, function(err, users) {
    res.send(users);
  });
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}));

module.exports = router;

// dependencies
const express = require('express');
const router = express.Router();

// local dependencies
const db = require('../db');
const passport = require('../config/passport');

// models
const User = require('../models/user');

// =====================================
// HOME PAGE (with login links) ========
// =====================================
router.get('/', function(req, res, next) {
  res.render('index.ejs');
});

// link to facebook
// router.get('/auth/facebook', passport.authenticate('facebook', {
//   scope: ['public_profile']
// }));
// router.get('/auth/facebook/callback',
//   passport.authenticate('facebook', {
//     successRedirect: '/home',
//     failureRedirect: '/',
//   }),
//   function(req, res) {
//     res.redirect('/');
//   }
// );

// =====================================
// LOGIN ===============================
// =====================================
router.get('/login', function(req, res) {
  // render the page and pass in any flash data if it exists
  res.render('login.ejs', { message: req.flash('loginMessage') }); 
});

// =====================================
// SIGNUP ==============================
// =====================================
router.get('/signup', function(req, res) {
  // render the page and pass in any flash data if it exists
  res.render('signup.ejs', { message: req.flash('signupMessage') });
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/home', // redirect to the secure profile section
  failureRedirect : '/signup', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));

// =====================================
// HOME SECTION ========================
// =====================================
router.get('/home', isLoggedIn, function(req, res) {
    res.render('home.ejs', {
        user : req.user // get the user out of session and pass to template
    });
});

// =====================================
// LOGOUT ==============================
// =====================================
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// =====================================
// MAKE SURE USER IS LOGGED IN =========
// =====================================
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;

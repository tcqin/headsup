const User = require('../models/user');

module.exports = function(app, passport) {

  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================
  app.get('/', function(req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect('/profile');
    }
    res.render('home.ejs');
  });

  // =====================================
  // LOGIN ===============================
  // =====================================
  app.get('/login', function(req, res) {
    if (req.isAuthenticated()) {
      res.redirect('/profile');
    }
    // render the page and pass in any flash data if it exists
    res.render('login.ejs', { message: req.flash('loginMessage') }); 
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }))

  // =====================================
  // SIGNUP ==============================
  // =====================================
  app.get('/signup', function(req, res) {
    if (req.isAuthenticated()) {
      res.redirect('/profile');
    }
    // render the page and pass in any flash data if it exists
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile',
    failureRedirect : '/signup',
    failureFlash : true
  }));

  // =====================================
  // HOME PAGE ===========================
  // =====================================
  app.get('/profile', isLoggedIn, function(req, res) {
    if (!req.isAuthenticated()) {
      res.redirect('/');
    }
    res.render('profile.ejs', {
        user : req.user // get the user out of session and pass to template
    });
  });

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function(req, res) {
    console.log(req.user);

    User.findOne({'local.username': req.user.local.username}, function(err, user) {
      user.online = false;
      user.save(function(err) {
        if (err) throw err;
      });
    });

    req.logout();
    res.redirect('/');
  });

};

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

const User = require('../models/user');

module.exports = function(app, passport) {

  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================
  app.get('/', function(req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect('/profile');
    } else {
      res.render('home.ejs');
    }
  });

  // =====================================
  // HOME PAGE ===========================
  // =====================================
  app.get('/profile', isLoggedIn, function(req, res) {
    if (!req.isAuthenticated()) {
      res.redirect('/');
    } else {
      res.render('profile.ejs', {
          user : req.user // get the user out of session and pass to template
      });
    }
  });

  app.get('/api/users', function(req, res) {
    User.find(req.query, function(err, users) {
      res.send(users);
    });
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

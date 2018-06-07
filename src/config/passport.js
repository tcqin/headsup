// libraries
const passport = require('passport');
const fbp = require('passport-facebook');
const lp = require('passport-local');

// import schemas
const User = require('../models/user');

// load the auth variables
const configAuth = require('./auth');

// =====================================
// LOCAL AUTHENTICATION ================
// =====================================
passport.use('local-signup', new lp.Strategy({

  // pull in necessary fields from our auth.js file
  usernameField: configAuth.localAuth.usernameField,
  passwordField: configAuth.localAuth.passwordField,
  passReqToCallback: configAuth.localAuth.passReqToCallback

  },

  function(req, email, password, done) {

    // asynchronous
    process.nextTick(function() {

      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to log in already exists
      User.findOne({'local.email': email}, function(err, user) {

        // return on error
        if (err) return done(err);

        // check to see if user already exists
        if (user) {
          return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        } else {
          // if there is no user with that email, create a new one
          var newUser = new User();

          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);

          // save the user
          newUser.save(function(err) {
            if (err) throw err;
            return done(null, newUser);
          });
        };
      });
    });
  }

));

// =====================================
// FACEBOOK AUTHENTICATION =============
// =====================================
passport.use(new fbp.Strategy({

  // pull in our app id and secret from our auth.js file
  clientID: configAuth.facebookAuth.clientID,
  clientSecret: configAuth.facebookAuth.clientSecret,
  callbackURL: configAuth.facebookAuth.callbackURL
  
  },

  // facebook will send back the token and profile
  function(accessToken, refreshToken, profile, done) {

    // asynchronous
    process.nextTick(function() {

      // find the user in the database based on their facebook id
      User.findOne({'facebook.id': profile.id }, function(err, user) {

        // return on error
        if (err) return done(err);


        // if the user is found, then log them in
        if (user) {
          user.online = true; // set the user to be online
          user.save(function(err) {
            if (err) {
              console.log(err);
              throw err;
            } else {
              return done(null, user); // user found, return that user
            }
          });
        } else {
          // if there is no user found with that facebook id, create them
          var user = new User();

          // set all of the facebook information in our user model
          user.facebook.id    = profile.id; // set the users facebook id                   
          user.facebook.token = accessToken; // we will save the token that facebook provides to the user                    
          user.facebook.name  = profile.displayName; // look at the passport user profile to see how names are returned
          user.online = true;
  
          user.save(function(err) {
            if (err) {
              console.log(err);
              throw err;
            } else {
              // if successful, return the new user
              return done(err, user);
            }
          });
        }

      });

    });

  }
));

// =====================================
// USER SERIALIZATION/DESERIALIZATION ==
// =====================================
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;

// libraries
const lp = require('passport-local');

// import schemas
const User = require('../models/user');

// load the auth variables
const configAuth = require('./auth');


// expose this function to our app
module.exports = function(passport) {

  // =====================================
  // LOCAL SIGNUP ========================
  // =====================================
  passport.use('local-signup', new lp.Strategy({

    // pull in necessary fields from our auth.js file
    usernameField: configAuth.localAuth.usernameField,
    passwordField: configAuth.localAuth.passwordField,
    passReqToCallback: configAuth.localAuth.passReqToCallback

    },

    function(req, username, password, done) {

      // asynchronous
      process.nextTick(function() {

        // find a user whose username is the same as the forms username
        // we are checking to see if the user trying to log in already exists
        User.findOne({'local.username': username}, function(err, user) {

          // return on error
          if (err) return done(err);

          // check to see if user already exists
          if (user) {
            return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
          } else {
            // if there is no user with that username, create a new one
            var newUser = new User();

            newUser.online = true;
            newUser.local.username = username;
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
  // LOCAL LOGIN =========================
  // =====================================
  passport.use('local-login', new lp.Strategy({

    // pull in necessary fields from our auth.js file
    usernameField: configAuth.localAuth.usernameField,
    passwordField: configAuth.localAuth.passwordField,
    passReqToCallback: configAuth.localAuth.passReqToCallback

    },

    function(req, username, password, done) {

      // asynchronous
      process.nextTick(function() {

        // find a user whose username is the same as the forms username
        // we are checking to see if the user trying to log in already exists
        User.findOne({'local.username': username}, function(err, user) {

          // return on error
          if (err) return done(err);

          // if no user, return the message
          if (!user) {
            return done(null, false, req.flash('loginMessage', 'No user found.'));
          }

          // if the user is found and the password is wrong
          if (!user.validPassword(password)) {
            return done(null, false, req.flash('loginMessage', 'Incorrect password!'));
          }

          // all is well
          user.online = true;
          user.save(function(err) {
            if (err) throw err;
            return done(null, user);
          })

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

};


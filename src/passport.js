// libraries
const passport = require('passport');
const fbp = require('passport-facebook');

// import schemas
const User = require('./models/user');

// set up passport configs for facebook
passport.use(new fbp.Strategy({
  clientID: '203216556963757',
  clientSecret: 'f46c6aaf128c4ea5568579c4697ee998',
  callbackURL: '/auth/facebook/callback'
  }, function(accessToken, refreshToken, profile, done) {
  User.findOne({'fbid': profile.id }, function(err, user) {
    // return on error
    if (err) return done(err);
    // create new document for user if one does not already exist
    if (!user) {
      user = new User({
        firstname: profile.displayName.split(" ")[0],
        lastname: profile.displayName.split(" ")[-1],
        fbid: profile.id,
      });
      user.save(function(err) {
        if (err) console.log(err);
        return done(err, user);
      });
    } else {
      return done(err, user);
    }
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;
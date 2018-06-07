// expose our config directly to our application using module.exports
module.exports = {

    // local authentication
    'localAuth' : {
        'usernameField'     : 'email',
        'passwordField'     : 'password',
        'passReqToCallback' : true // allows us to pass back the entire request to the callback
    },

    // facebook authentication
    'facebookAuth' : {
        'clientID'      : '203216556963757', // your App ID
        'clientSecret'  : 'f46c6aaf128c4ea5568579c4697ee998', // your App Secret
        'callbackURL'   : '/auth/facebook/callback'
    }

    // other authentication methods

};
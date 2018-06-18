const Game = require('../models/game');

module.exports = function(app, passport) {

  app.post('/game/create', function (req, res) {
    var room_id = '1111'; // should be random string
    var num_players = req.body.num_players;
    var players = [{
        username: req.body.username,
        status: 'joined',
      }];
    
    // Create placeholders for the other players to join
    // the game.
    for (var i=1; i<num_players; i++) {
      players.push({
        name: null,
        status: 'open',
      });
    }
   
    Game.create({
      room_id: room_id,
      status: 'waiting',
      num_players: num_players,
      players: players
    },
      function( err, game ) {
        res.redirect('/game/' + room_id);
      });
    });

  app.get('/game/:room_id', isLoggedIn, function (req, res) {
   
     // First find the room and validate it exists.  The returned game document
     // will not be modified.  That will be done later using findOneAndUpdate()
     // I just want to be able to differentiate between error conditions -
     // room not found vs room full.
     Game.findOne({room_id: req.params.room_id}, function(err, game) {
   
        if ( err || !game ) {
          res.send( 400, { code: 'roomNotFound', message: 'Failed to find the expected game room' } );
        } else {
          var player = {
            username: req.body.name,
            status: 'joined',
          };
          // add something to database?
          res.render('game.ejs', {username: req.user, room_id: game.room_id})
        }
   
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

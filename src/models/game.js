// import node modules
const mongoose = require("mongoose");

// define a schema
const GameSchema = new mongoose.Schema({
  room_id: String,
  status: String,
  num_players: Number,

  players: [mongoose.Schema({
    username: String,
    status: String
   })]

});

// compile model from schema
module.exports = mongoose.model('Game', GameSchema);
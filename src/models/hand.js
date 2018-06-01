// import node modules
const mongoose = require("mongoose");

// define a schema
const HandModelSchema = new mongoose.Schema({
    BU: String,
    BB: String,
    BU_starting_stack: Number,
    BB_starting_stack: Number,
    time: Date,
    action: String
});

// compile model from schema
module.exports = mongoose.model('HandModel', HandModelSchema);
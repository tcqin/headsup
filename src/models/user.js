// import node modules
const mongoose = require("mongoose");

// define a schema
const UserModelSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    fbid: String,
});

// compile model from schema
module.exports = mongoose.model('UserModel', UserModelSchema);
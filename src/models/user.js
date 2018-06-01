// import node modules
const mongoose = require("mongoose");

// define a schema
const UserModelSchema = new mongoose.Schema({
    
    online: Boolean,

    facebook: {
        id      : String,
        token   : String,
        name    : String
    }
});

// compile model from schema
module.exports = mongoose.model('UserModel', UserModelSchema);
// import node modules
const mongoose = require("mongoose");
const bcrypt   = require('bcrypt-nodejs');

// define a schema
const UserModelSchema = new mongoose.Schema({

    online: Boolean,

    local: {
        email   : String,
        password: String
    },

    facebook: {
        id      : String,
        token   : String,
        name    : String
    }
});

// generating a hash
UserModelSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

UserModelSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
}

// compile model from schema
module.exports = mongoose.model('UserModel', UserModelSchema);
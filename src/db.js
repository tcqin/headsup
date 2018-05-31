// libraries
const mongoose = require('mongoose');

// set up mongoDB connection
const mongoURL = 'mongodb://nlhe_headsup_admin:pokergods5186@ds239930.mlab.com:39930/nlhe_headsup';
mongoose.connect(mongoURL, {});
mongoose.Promise = global.Promise;
const db = mongoose.connection;

// db error handling
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;
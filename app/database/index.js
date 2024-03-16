const mongoose = require('mongoose');
const { dbHost, dbPort, dbName, dbUser, dbPass } = require('../config');

mongoose.connect(`mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`, {
    authSource: 'admin', // tambahkan authSource
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});

module.exports = db;

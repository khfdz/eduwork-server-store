// const mongoose = require('mongoose');
// const { dbHost, dbPort, dbName, dbUser, dbPass } = require('../config');

// mongoose.connect(`mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`, {
//     authSource: 'admin', // tambahkan authSource
// });

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//     console.log('Connected to MongoDB');
// });

// module.exports = db;

require('dotenv').config();
const mongoose = require('mongoose');

// URI Koneksi MongoDB Atlas dari file .env
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Kesalahan koneksi:'));
db.once('open', () => {
    console.log('Terhubung ke MongoDB Atlas');
});

module.exports = db;

// Middleware dan rute lainnya di sini

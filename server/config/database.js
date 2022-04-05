const mongoose = require('mongoose');
const {MONGO_URL} = require('./db_url');

module.exports = (app) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const db = mongoose.connection;
        db.on('error', err => {
            console.error('Database error: ', err.message);
            reject(err.message);
        });
        db.on('open', () => {
            console.log('Database connected!');
            resolve();
        });
    });
}
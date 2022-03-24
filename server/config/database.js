const mongoose = require('mongoose');
const config = require('./config');


module.exports = (app) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(config.DB_CONNECTION, {
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
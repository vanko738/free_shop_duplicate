
const env = process.env.NODE_ENV || 'development';

const { MONGO_URL } = require('./db_url')

const config = {
    development: {
        PORT: process.env.PORT || 5000,
        DB_CONNECTION: MONGO_URL,
        TOKEN_SECRET: 'very secret token',
        COOKIE_NAME: 'SESSION_DATA',
        CORS: {
            origin: ['http://localhost:3000'],
            credentials: true
        }
    },
    production: {
        PORT: process.env.PORT || 80,
        DB_CONNECTION: MONGO_URL,
        TOKEN_SECRET: 'very secret token',
        COOKIE_NAME: 'SESSION_DATA',
        CORS: {
            origin: ["https://iwanttohave.herokuapp.com/"],
            credentials: true
        }
    }
}
module.exports = config[env];
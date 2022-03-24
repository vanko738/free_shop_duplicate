
const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        PORT: process.env.PORT || 5000,
        TOKEN_SECRET: 'very secret token',
        COOKIE_NAME: 'SESSION_DATA',
        DB_CONNECTION: 'mongodb+srv://ivan:1990@shopcluster.9cs5p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        CORS: {
            origin: 'http://localhost:3000',
            credentials: true
        }
    }
}

module.exports = config[env];
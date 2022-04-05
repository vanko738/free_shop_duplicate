

const express = require('express');
const cookieParser = require('cookie-parser');
const auth = require('../middlewares/auth');

const cors = require('cors');
const path = require('path');
const config = require('./config');

module.exports = (app) => {
    app.use(express.static(path.join(__dirname, '..', 'public', 'build')));
    app.use(express.urlencoded({ extended: true }));

    app.use(express.json());
    app.use(cookieParser());
    app.use(cors(config.CORS));
    app.options('*', cors());
    app.use(auth());

}


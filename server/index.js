const express = require('express');
const config = require('./config/config')

const expressConfig = require('./config/express');
const routesConfig = require('./config/routes');
const databaseConfig = require('./config/database');

const storage = require('./middlewares/storage');
const logger = require('./middlewares/logger');
const path = require('path');

start();

async function start() {
    const app = express();

    app.use(logger());

    await databaseConfig(app);
    expressConfig(app);

    app.use(await storage());
    routesConfig(app);




        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, 'public/index.html'));
        });
    app.listen(config.PORT, () => console.log(`app is listening on port ${config.PORT}`));
}


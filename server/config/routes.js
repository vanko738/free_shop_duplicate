const productsController = require('../controllers/productsController');
const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');


module.exports = (app) => {
    app.use('/products', productsController);
    app.use('/auth/', authController);

    app.use('/', homeController);

    app.use('*', (req, res) => {
        res.json({ status: '404', message: 'Not found page' })
    });
}
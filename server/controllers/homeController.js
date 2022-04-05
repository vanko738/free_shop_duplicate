const router = require('express').Router();

router.get('/api/home', (req, res) => {
    res.redirect('/products')
});
module.exports = router;
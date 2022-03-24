function isAuth() {
    return (req, res, next) => {
        if (req.user != undefined) {
            next();
        } else {
            res.status(401).send('Unauthorized')
        }
    };
};

function isGuest() {
    return (req, res, next) => {
        if (req.user == undefined) {
            next();
        } else {
            res.redirect('/products');
        }
    };
}
function isOwner() {
    return (req, res, next) => {
        if (req.data.article && req.user && (req.data.article.owner == req.user._id)) {
            next();
        } else {
            throw new Error('isNotOwner')
        }
    };
}

module.exports = {
    isAuth,
    isGuest,
    isOwner
}
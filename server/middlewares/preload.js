function preloadArt() {
    return async (req, res, next) => {
        req.data = req.data || {};
        try {
            const article = await req.storage.getById(req.params.id);
            if (article) {
                req.data.article = article
            }
        } catch (err) {
            console.error('Database error!', err.message);
        }
        next();
    };
};
module.exports = {
    preloadArt
}
const router = require('express').Router();

const { getUserById } = require('../services/userServices');

const { createAndEditArt } = require('../util/createArticle');

const { isOwner, isAuth } = require('../middlewares/guards');
const { preloadArt } = require('../middlewares/preload');


// Home
router.get('/', async (req, res) => {
    try {
        const result = await req.storage.getAll();
        res.json({ article: result, status: 200 })
    } catch (err) {
        res.json({ message: 'No Records in the database!' })
    }
});
router.get('/:category', async (req, res) => {
    try {
        const result = await req.storage.getAll(req.params.category);
        if (result.length == 0) {
            return res.json({ article: result, message: 'No article in the database yet' })
        }
        res.json({ article: result, status: 200 })
    } catch (err) {
        res.json({ status: 404, message: err.message })
    }
});

// Create
router.post('/create', isAuth(), async (req, res) => {
    const data = {
        model: req.body
    };

    const result = createAndEditArt(data)
    result.owner = req.user._id;

    if (result != undefined) {
        try {
            await req.storage.createArtModel(result);
            res.json({ status: 200, message: 'Succsessfully created!' })
            console.log('Create Article!');
        } catch (err) {
            res.json({ status: 404, message: err.message })
        }
    }

});

// Details ! 
router.get('/details/:id', async (req, res) => {
    try {
        const currentArt = await req.storage.getById(req.params.id);

        const artOwner = await getUserById(currentArt.owner);

        if (!currentArt || !artOwner) {
            throw new Error('No record in the database!')
        }

        res.json({ article: currentArt, status: 200, owner: artOwner })

    } catch (err) {
        res.json({ message: err.message })
    }
});

//Edit 
router.post('/edit/:id', preloadArt(), isOwner(), async (req, res) => {

    const data = {
        model: req.body,
        edit: true
    };
    try {
        const result = createAndEditArt(data);
        if (!result) {
            throw new Error(result)
        }
        await req.storage.edit(req.params.id, result);
        res.json({ status: 200, message: 'Succsessfully edited!' })
    } catch (err) {
        res.json({ status: 404, message: err.message })
    };
});
router.post('/deleteArt/:id', preloadArt(), isOwner(), async (req, res) => {
    try {
        await req.storage.deleteArtcle(req.params.id);
        res.json({ status: 200, message: 'Succssefully delete item' })
        console.log('Succssefully delete item');
    } catch (err) {
        console.log(err.message);
    };
});

// create comment
router.post('/createComment', isAuth(), async (req, res) => {

    const data = { artId, username, comment, category } = req.body;
    try {
        if (!artId || !username || !comment || !category) {
            throw new Error('Invalid data!')
        }
        const commId = await req.storage.createComment(data);

        res.json({ message: 'Comment added successfully', status: 200, _id: commId })
    } catch (err) {
        res.json({ message: err.message, status: 404 })
    }
});

// get comments
router.get('/details/comments/:id', async (req, res) => {
    try {
        const artResult = await req.storage.getAll();

        const currentArt = artResult.reduce((acc, c) => {
            if (c._id == req.params.id) {
                acc.article = c
            }
            return acc;
        }, {});


        res.json({ comments: currentArt.article.comments.reverse(), status: 200 })

    } catch (err) {
        res.json({ message: 'No comments in the database!' })
    }

});
router.post('/likeArt', isAuth(), async (req, res) => {

    try {
        await req.storage.addLike(req.body);
        res.json({ status: 200, message: 'Succsessfully liked!' })
        console.log('Liked Article!');
    } catch (err) {
        res.json({ status: 404, message: 'Error likes' })
    }

});

router.get('/userArticles/:id', async (req, res) => {
    try {
        const result = await req.storage.getUserArticles(req.params.id);
        if (!result) {
            throw new Error('No items found!')
        }
        res.json({ status: 200, article: result })
    } catch (err) {
        res.json({ status: 404, message: err.message })
    }
})
router.get('/userLikedCreatedArt/:id', async (req, res) => {
    const createdArticle = await req.storage.getUserArticles(req.params.id);
    try {
        const result = await req.storage.getUserLikedArticles(req.params.id);
        res.json({ status: 200, article: result, userArticle: createdArticle.length })
    } catch (err) {
        res.json({ status: 404, message: err.message })
    }
})

module.exports = router;

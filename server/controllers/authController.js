const router = require('express').Router();
const { body, validationResult } = require('express-validator');

const { isAuth } = require('../middlewares/guards')
const { getUserByUsername, getUserByEmail, createMessageSend, getUserMessages, getAllMessagesForCurrentArticle, deleteDiscussion } = require('../services/userServices');

router.post('/register',
    body('username', 'The username should be at least 5 characters long!').isLength({ min: 5 }),
    body('email', 'Invalid Email!').matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    body('password', 'The password should be at least 4 characters long!').trim().isLength({ min: 4 }).isAlphanumeric(),
    body('rePass').trim().custom((value, { req }) => {
        if (value != req.body.password) {
            throw new Error('Password don\'t match!')
        }
        return true;
    })
    , async (req, res) => {

        try {
            const isNameTaken = await getUserByUsername(req.body.username);
            const isEmailTaken = await getUserByEmail(req.body.email);

            if (isNameTaken) {
                throw new Error("Failed! Name is already in use!")
            };
            if (isEmailTaken) {
                throw new Error("Failed! Email is already in use!")
            };

            try {
                const errors = Object.values(validationResult(req).mapped());
                if (errors.length > 0) {
                    res.json({ status: 404, message: "Server Error" })
                    throw new Error(errors.map(x => x.msg).join('\n'));
                };
                await req.auth.register(req.body);

                const user = req.user;
                if (!user) {
                    throw new Error('Invalid Token!')
                } else {
                    const { _id, username, email, token } = req.user;
                    res.json({ _id, username, email, token, status: 200 })
                }
            } catch (err) {
                res.json({ status: 404, message: err.message })
                return;
            };

        } catch (err) {
            console.log(err.message);
            res.json({ status: 404, message: err.message })
            return;
        }

    });

router.post('/login', async (req, res) => {

    try {
        await req.auth.login(req.body);
        const user = req.user;
        if (!user) {
            throw new Error('Invalid Token!')
        } else {
            const { _id, username, email, token } = req.user;
            res.json({ _id, username, email, token, status: 200 })
        }

    } catch (err) {
        console.log(err.message);
        res.json({ status: 404, message: err.message })
        return;
    };
});
// Send message
router.post('/sendMessage', async (req, res) => {
    const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    try {
        if (!req.body.mail.match(emailReg)) {
            throw new Error('Invalid Data!')
        }
        const messageId = await createMessageSend(req.body);
        res.json({ message: 'The message has been send successfully ', status: 200, msgId: messageId })
    } catch (err) {
        res.json({ status: 404, message: err.message })
        return;
    };
});

router.get('/logout', (req, res) => {
    try {
        req.auth.logout();
    } catch (err) {
        console.log(err.message);
    }
})
// Get messages
router.get('/getUserMessages/:id', isAuth(), async (req, res) => {

    try {
        const data = await getUserMessages(req.params.id);
        res.json({ status: 200, dataInfo: data })
    } catch (err) {
        res.json({ status: 404, message: err.message })
    }
})
router.get('/getAllMessagesForCurrentArticle/:artId/:senderId', isAuth(), async (req, res) => {

    try {
        const data = await getAllMessagesForCurrentArticle(req.params.artId, req.params.senderId, req.user._id);

        res.json({ status: 200, infoData: data })
    } catch (err) {
        res.json({ status: 404, message: err.message })
    }
})
router.post('/deleteDiscussion', isAuth(), async (req, res) => {
    const data = { ...req.body };
    const profileOwnerId = req.user._id;
    data.profileOwnerId = profileOwnerId;
    try {
        const result = await deleteDiscussion(data);

        if (result) {
            res.json({ status: 200 })
        }

    } catch (err) {
        console.log(err.message);
        throw new Error('Database error!')
    }
})

module.exports = router;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
 const config = require('../config/config');
 
const { getUserByUsername, getUserByEmail, createUser } = require('../services/userServices');

module.exports = () => (req, res, next) => {
    req.auth = {
        register,
        login,
        logout
    };

    if (readToken(req)) {
        next();
    }
    //register
    async function register({ username, email, password }) {
        try {
            const isNameTaken = await getUserByUsername(username);
            if (isNameTaken) {
                throw new Error('Name is taken!');
            };

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await createUser(username, email, hashedPassword);
            req.user = createToken(user);
        } catch (err) {
            console.log(err);
            res.status(400).send({ message: err.message });
        }

    };

    //Login middleware!

    async function login({ email, password }) {
        try {
            const user = await getUserByEmail(email);
            if (!user) {
                throw new Error('Wrong username or password!');
            } else {
                const isMatch = await bcrypt.compare(password, user.hashedPassword);
                if (!isMatch) {
                    throw new Error('Wrong username or password!')
                } else {
                    req.user = createToken(user);
                };
            };

        } catch (err) {
            return res.json({ status: 404, message: err.message })
        }

    };

    //logout

    async function logout() {
        res.clearCookie(config.COOKIE_NAME);
        res.status(200).send({ message: 'Logged out' })
    }

    //createToken!
    function createToken(user) {
        let userViewModel = { _id: user._id, username: user.username, email: user.email };
        const token = jwt.sign(userViewModel, config.TOKEN_SECRET, { expiresIn: "10h" });
        res.cookie(config.COOKIE_NAME, token, { htppOnly: true });
        userViewModel.token = token;
        return userViewModel;
    }

    //readToken!!
    function readToken(req) {
        const token = req.cookies[config.COOKIE_NAME];

        if (token) {
            try {
                const userData = jwt.verify(token, config.TOKEN_SECRET);
                req.user = userData;
                res.locals.user = userData;

                console.log('Know user', userData.username);
            } catch (err) {
                res.clearCookie(COOKIE_NAME);
                res.redirect('/auth/login');
                return false;
            }
        };
        return true;
    }
}
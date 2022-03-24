const uniqId = require('uniqid');

const Car = require('../models/Car');
const Animal = require('../models/Animal');
const Dress = require('../models/Dress');

// get all Articles
async function getAll(params) {

    const Cars = await Car.find({}).lean();
    const Animals = await Animal.find({}).lean();
    const Clothes = await Dress.find({}).lean();

    let result;

    if (!params) {
        result = [...Cars, ...Animals, ...Clothes];
    } else {
        result = [...Cars, ...Animals, ...Clothes].filter(x => x.category == params)
    }

    return result;
};

async function getById(id) {

    try {
        const artResult = await getAll();

        const currentArt = artResult.reduce((acc, c) => {
            if (c._id == id) {
                acc.article = c
            }
            return acc;
        }, {});
        if (!currentArt) {
            throw new Error('No record in the database!')
        }

        return currentArt.article;
    } catch (err) {
        throw new Error(err.message)
    }
}

async function createArtModel(art) {
    try {
        if (art.category == 'cars') {
            const record = new Car(art);
            return record.save()
                .then(doc => { })
                .catch(err => {
                    throw new Error(err)
                });
        } else if (art.category == 'animals') {
            const record = new Animal(art);
            return record.save()
                .then(doc => { })
                .catch(err => {
                    throw new Error(err)
                });
        } else if (art.category == 'clothes') {
            const record = new Dress(art);
            return record.save()
                .then(doc => { })
                .catch(err => {
                    throw new Error(err)
                });
        }
    } catch (err) {
        throw new Error(err.message)
    }
};
async function createComment(data) {

    let time = new Date()
    const currentTime = time.toString().substring(0, 24);

    const model = {
        cars: Car,
        animals: Animal,
        clothes: Dress
    }
    const { artId, username, comment, category } = data;

    try {
        const commID = uniqId();

        const article = await model[category].findOne({ _id: artId });
        article.comments.push({ _id: commID, username, comment, time: currentTime });

        await article.save();
        return commID;
    } catch (err) {
        throw new Error(err.message)
    }
};

async function edit(id, article) {

    const model = {
        cars: Car,
        animals: Animal,
        clothes: Dress
    }
    try {
        const record = await model[article.category].findOne({ _id: id });
        if (!record) {
            throw new Error('No such article!')
        }
        Object.assign(record, article);

        await record.save();

    } catch (err) {
        throw new Error(err.message)
    }
};

async function deleteArtcle(id) {


    const model = {
        cars: Car,
        animals: Animal,
        clothes: Dress
    }
    try {
        const allArticle = await getAll();
        const currentArticle = allArticle.find(x => x._id == id);

        if (!currentArticle) {
            throw new Error('No record in database!');
        }
        await model[currentArticle.category].deleteOne({ _id: currentArticle._id })
    } catch (err) {
        throw new Error(err.message)
    }



}

async function addLike({ artId, userId, category }) {

    const model = {
        cars: Car,
        animals: Animal,
        clothes: Dress
    }
    try {
        const record = await model[category].findOne({ _id: artId });

        if (!record) {
            throw new Error('No such article!')
        } else {
            record.liked.push(userId)
            await record.save();
        }


    } catch (err) {
        throw new Error(err.message)
    }

}
async function getUserArticles(userId) {
    try {
        const result = await (await getAll()).filter(x => x.owner == userId);
        if (!result) {
            throw new Error('No such article!')
        } else {
            return result;
        }
    } catch (err) {
        throw new Error(err.message)
    }

}
async function getUserLikedArticles(userId) {
    let likedArt = [];

    try {
        await (await getAll()).forEach((art) => {
            art.liked.forEach((x) => {
                if (x == userId) {
                    if (!likedArt.includes(art)) {
                        likedArt.push(art)
                    }
                }
            })
        });

        return likedArt;
    } catch (err) {
        throw new Error(err.message)
    }

}


module.exports = {
    getAll,
    getById,
    createArtModel,
    createComment,
    edit,
    deleteArtcle,
    addLike,
    getUserArticles,
    getUserLikedArticles
}
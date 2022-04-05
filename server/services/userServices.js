const User = require('../models/User');
const { getAll } = require('../services/product');
const uniqId = require('uniqid')

async function createUser(username, email, hashedPassword) {
    const user = new User({
        username,
        email,
        hashedPassword
    });
    console.log('This is create user funct');
    await user.save()
        .then(doc => { })
        .catch(err => {
            throw new Error(err)
        });;

    return user;
};

async function getUserByUsername(username) {
    return await User.findOne({ username: { $regex: username, $options: 'i' } });
};
async function getUserByEmail(email) {
    return await User.findOne({ email: { $regex: email, $options: 'i' } });
};
async function getUserById(id) {

    const { username, email, _id } = await User.findOne(id);
    const user = { username, email, _id };
    return user;
};
async function createMessageSend(data) {

    try {
        if (!data.username || !data.mail || !data.userId || !data.message || !data.articleId) {
            throw new Error('Invalid data!')
        }

        const recieverUser = await User.findOne({ _id: data.ownerId });
        const sender = await User.findOne({ _id: data.userId });

        if (!sender.sendedMessages.find(x => x.recieverId == data.ownerId)) {
            sender.sendedMessages.push({
                recieverId: data.ownerId,
                message: [{
                    messageId: uniqId(),
                    recieverId: data.ownerId,
                    senderId: data.userId,
                    msg: data.message,
                    username: sender.username,
                    email: sender.email,
                    articleId: data.articleId,
                    date: new Date()
                }]
            });
            await sender.save()
                .then(doc => { })
                .catch(err => {
                    throw new Error(err)
                });
        } else {
            const obje = {
                messageId: uniqId(),
                recieverId: data.ownerId,
                senderId: data.userId,
                username: sender.username,
                email: sender.email,
                msg: data.message,
                articleId: data.articleId,
                date: new Date()
            }
            await User.updateOne(
                {
                    _id: data.userId,
                    "sendedMessages.recieverId": data.ownerId
                },
                {
                    $push: { "sendedMessages.$.message": obje }
                }).then(result => {
                    if (result.nModified == 1 && result.n == 1) {
                        console.log(`Successfully added a new message.`)
                    }
                })
                .catch(err => console.error(`Failed to add message: ${err}`))
        }

        // 2 
        if (!recieverUser.recievedMessages.find(x => x.senderId == data.userId)) {
            recieverUser.recievedMessages.push({
                senderId: data.userId,
                message: [{
                    messageId: uniqId(),
                    recieverId: data.ownerId,
                    senderId: data.userId,
                    msg: data.message,
                    username: data.username,
                    email: data.mail,
                    articleId: data.articleId,
                    date: new Date()
                }]
            });
            await recieverUser.save()
                .then(doc => { })
                .catch(err => {
                    throw new Error(err)
                });
        } else {
            const obje = {
                messageId: uniqId(),
                recieverId: data.ownerId,
                senderId: data.userId,
                username: data.username,
                email: data.mail,
                msg: data.message,
                articleId: data.articleId,
                date: new Date()
            }
            await User.updateOne(
                {
                    _id: data.ownerId,
                    "recievedMessages.senderId": data.userId
                },
                {
                    $push: { "recievedMessages.$.message": obje }
                }).then(result => {
                    if (result.nModified == 1 && result.n == 1) {
                        console.log(`Successfully added a new message.`)
                    }
                })
                .catch(err => console.error(`Failed to add message: ${err}`))

        }
        return uniqId();
    } catch (err) {
        return err.message
    }

};
async function getUserMessages(userId) {
    try {
        const user = await User.findOne({ _id: userId });

        //1
        const messages = user.recievedMessages.reduce((acc, c) => {
            const currentMessages = [];
            c.message.forEach((y) => {
                if (!currentMessages.find(x => x.articleId == y.articleId)) {
                    currentMessages.push(y)
                }
            })
            acc.push(currentMessages);
            return acc
        }, [])

        const userMessageInfo = [];
        messages.map((x) => {
            x.forEach((y) => {
                userMessageInfo.push(y)
            })
        })

        let docInfo = await (await getAll())
            .filter(x => x.owner == userId).reduce((acc, c) => {
                userMessageInfo.forEach((a) => {
                    if (a.articleId == c._id) {
                        acc.push({ documentId: uniqId(), artData: c, userInfo: a })
                    }
                })
                return acc
            }, []);

        //2
        const mySendedMsg = user.sendedMessages.reduce((acc, c) => {
            const currSendMsg = [];
            c.message.forEach((y) => {
                if (!currSendMsg.find(x => x.articleId == y.articleId)) {
                    currSendMsg.push(y)
                }
            })
            acc.push(currSendMsg);
            return acc
        }, [])

        const userMsgInfo = [];
        mySendedMsg.map((x) => {
            x.forEach((y) => {
                userMsgInfo.push(y)
            })
        })

        let myDocInfo = await (await getAll())
            .filter(x => x.owner != userId).reduce((acc, c) => {
                userMsgInfo.forEach((a) => {
                    if (a.articleId == c._id) {
                        acc.push({ documentId: uniqId(), artData: c, userInfo: a })
                    }
                })
                return acc
            }, []);

        const allDocInfo = [...docInfo, ...myDocInfo];

        return allDocInfo;
    } catch (err) {
        return err.message
    }

};

async function getAllMessagesForCurrentArticle(artId, senderIds, userId) {
    try {
        const article = await (await getAll()).find(x => x._id == artId);
        const sender = await User.findById({ _id: senderIds });
        const owner = await User.findById({ _id: userId });

        const msgForCurrentArt = owner.recievedMessages
            .filter(x => x.senderId == sender._id)
            .reduce((acc, c) => {
                c.message.forEach((x) => {
                    if (x.articleId == article._id) {
                        acc.push(x)
                    }
                })
                return acc
            }, []);



        const myMsgForCurrentArticle = owner.sendedMessages
            .filter(x => x.recieverId == sender._id)
            .reduce((acc, c) => {
                c.message.forEach((x) => {
                    x.myMessage = true
                    if (x.articleId == article._id) {
                        acc.push(x)
                    }
                })
                return acc
            }, []);
        const array = [...msgForCurrentArt, ...myMsgForCurrentArticle].sort(function (a, b) {
            var c = new Date(a.date);
            var d = new Date(b.date);
            return c - d;
        });

        return array;
        return
    } catch (err) {
        throw new Error(err.message)
    }
}
async function deleteDiscussion(data) {

    let isDeleted = false;

    const participantId = data.profileOwnerId != data.recieverId ? data.recieverId : data.senderId;
    const profileOwner = await User.findById({ _id: data.profileOwnerId });


    await User.updateOne(
        {
            _id: profileOwner._id,
        },
        {
            $pull:
            {
                recievedMessages: {
                    message: { $elemMatch: { senderId: participantId, articleId: data.artId } }
                }

            }
        },
        { multi: true },   // if you have multiple articleId and randid in your array, remove otherwise
        function (err, result) {
            if (err)
                isDeleted = false
            else
                isDeleted = true
            console.log(result);
        })


    await User.updateOne(
        {
            _id: profileOwner._id,
        },
        {
            $pull:
            {
                sendedMessages: {
                    message: { $elemMatch: { recieverId: participantId, articleId: data.artId } }
                }
            }
        },
        { multi: true },   // if you have multiple articleId and randid in your array, remove otherwise
        function (err, result) {
            if (err)
                isDeleted = false;
            else
                isDeleted = true;
            console.log(result);

        });

    return isDeleted;
}
module.exports = {
    createUser,
    getUserByUsername,
    getUserByEmail,
    getUserById,
    createMessageSend,
    getUserMessages,
    getAllMessagesForCurrentArticle,
    deleteDiscussion
}
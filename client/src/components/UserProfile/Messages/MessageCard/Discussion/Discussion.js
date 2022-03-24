import React, { useContext, useEffect, useState } from 'react';

import OwnerCard from './DiscussionCards/OwnerCard/OwnerCard';
import SenderCard from './DiscussionCards/SenderCard/SenderCard';
import MessageNot from '../../../../Notification/MessageNot';

import { deleteDiscussion, getAllMessagesForCurrentArticle, sendMessage } from '../../../../../services/user';

import { useNavigate, useParams } from 'react-router-dom';
import { getById } from '../../../../../services/article';
import UserContext from '../../../../../context/UserDataContext';

import './Discussion.css'

export default function Discussion() {
    const { userData } = useContext(UserContext);
    const { artId, senderId } = useParams([]);
    const navigate = useNavigate();

    const [recMesg, setRecMesg] = useState();
    const [article, setArticle] = useState();
    const [msgNot, setMsgNot] = useState([]);
    const [msgIsSend, setMsgIsSend] = useState(false);
    const [messageId, setMessageId] = useState({})

    useEffect(() => {
        getAllMessagesForCurrentArticle(artId, senderId).then(res => {
            if (res.status === 200) {
                setRecMesg(res);
            }
        }).catch(err => {
            console.log(err);
        })
    }, [artId, senderId, messageId]);

    useEffect(() => {
        getById(artId).then(res => {
            setArticle(res.article)
        }).catch(err => {
            console.log(err.message);
        })
    }, [artId]);

    async function submitHandler(e) {
        e.preventDefault();
        const msg = Object.fromEntries(new FormData(e.target));


        if (msg.message.length > 5) {
            const data = {
                username: userData.username,
                mail: userData.email,
                message: msg.message,
                ownerId: senderId,
                userId: userData._id,
                articleId: article._id
            }
            setMsgIsSend(false);
            try {
                const result = await sendMessage(data);
                if (result.status === 200) {
                    setMsgNot({ message: result.message });
                    setMessageId(result.msgId)
                    setMsgIsSend(true);
                    e.target.reset();
                }
            } catch (err) {
                setMsgNot(err.message)
            }
        } else {
            setMsgIsSend(false);
            setMsgNot({ err: "The message must be large than 5 characters!" })
        }
    }
    return (
        <div className='discussion-container'>
            <div className='discussion-article-info-img'>
                <h3 className='discussion-article-info-title'>Article-Info</h3>
                <div className='discussion-art-img'>
                    <img src={article?.image} alt="artImage" />
                </div>
                <div className='discussion-art-info'>
                    <ul className='discussion-ul-items'>
                        <li>City - {article?.city}</li>
                        <li>Year - {article?.year || article?.birthday}</li>
                        <li>Likes - {article?.liked?.length}</li>
                        <li>Price - {article?.price}$</li>
                    </ul>
                </div>
            </div>
            <div className='chat-msg-container'>
                <h3 className='dsc-chat-msg-title'>Chat</h3>
                <div className='my-msg-stra'>
                    {recMesg?.infoData?.length > 0 ?
                        recMesg?.infoData.map(x => x.myMessage ? <OwnerCard key={x.messageId} recMesg={x} /> :
                            <SenderCard key={x.messageId} recMesg={x} />)
                        :
                        ""
                    }
                </div>
                <div className='form-msg'>
                    <form onSubmit={submitHandler}>
                        <textarea name="message" id="txt-area" cols="70" rows="4" placeholder='Your message...'></textarea>
                        <div className="form-btn">
                            <input className="submit-btn" type="submit" value="Send" />
                            <input className="reset-btn" type="reset" value="Reset" />
                        </div>
                    </form>
                    {msgIsSend ? <MessageNot message={msgNot.message} /> : <p style={{ color: "red", 'fontSize': "12px" }}>{msgNot.err}</p>}
                </div>
            </div>
            <div className='del-discussion'>
                <button type='button' onClick={(() => deleteDiscussion(recMesg?.infoData[0].articleId, recMesg?.infoData[0].recieverId, recMesg?.infoData[0].senderId)
                    .then(res => res.status === 200 ? navigate(`/messages/${userData._id}`) : ""))} className='del-discuss-btn'>Remove Discussion</button>
            </div>
        </div>
    )
}

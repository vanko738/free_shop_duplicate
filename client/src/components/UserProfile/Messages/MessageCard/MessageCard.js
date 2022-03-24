import React from 'react';
import './MessageCard.css';

import { Link } from 'react-router-dom';

export default function MessageCard({ data, currentUser }) {
    return (
        <div className='msg-container'>
            <div className='msg-box'>
                <div className='time-author'>
                    {data.userInfo.senderId === currentUser ? <h3 className='msg-box-author' style={{ color: "red" }}>Me</h3> :
                        <h3 className='msg-box-author'>{data.userInfo.username}</h3>}
                    <p className='msg-time'>{data.userInfo.time}</p>
                </div>
                <div className='msg-box-content'>
                    <div className='msg-box-img'>
                        <img src={data.artData.image} alt="article-img" />
                    </div>
                    <div className='msg-box-message'>
                        <p className='msg-box-message-content'>
                            {data.userInfo.msg}
                        </p>
                    </div>
                    <div className='msg-card-btn'>
                        <Link to={`/messages/${data.artData.owner}/${data.artData._id}/${data.userInfo.senderId === currentUser ? data.userInfo.recieverId : data.userInfo.senderId}`}>more</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

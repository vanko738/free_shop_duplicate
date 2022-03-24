import React from 'react'
import { getMessageDateAndTime } from '../../../../../../../date/getMsgDateTime';

import './SenderCard.css'
export default function SenderCard({ recMesg }) {

    const currentDateAndTime = getMessageDateAndTime(recMesg.date);
    const name = recMesg.username.slice(0, 2).toUpperCase();
    return (
        <div className='chat-msg-box'>
            <div className='chat-avatar'>
                <h4 className='chat-av-name'>
                    {name}
                </h4>
            </div>
            <p className='chat-message'>
                {recMesg.msg}
            </p>
            <div className='msg-time'>
                {currentDateAndTime}
            </div>
        </div>
    )
}

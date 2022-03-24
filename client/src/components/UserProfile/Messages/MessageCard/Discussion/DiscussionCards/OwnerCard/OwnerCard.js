import React from 'react'
import { getMessageDateAndTime } from '../../../../../../../date/getMsgDateTime';

import './OwnerCard.css'

export default function OwnerCard({ recMesg }) {
    const currentDateAndTime = getMessageDateAndTime(recMesg.date);
    return (
        <div className='chat-msg-box-me'>
            <div className='chat-avatar-me'>
                <h4 className='chat-av-me'>
                    Me
                </h4>
            </div>
            <p className='chat-message-me'>
                {recMesg.msg}
            </p>
            <div className='msg-time'>
                {currentDateAndTime}
            </div>
        </div>
    )
}

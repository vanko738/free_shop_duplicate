import React from 'react'
import './CommentCard.css'

export default function CommentCard({comment}) {
 
    return (
        <div className="comment-container">
            <p className="comment title">{comment.username}</p>
            <p className="comment text">{comment.comment}</p>
            <p className="comment time">{comment.time}</p>
        </div>
    )
}

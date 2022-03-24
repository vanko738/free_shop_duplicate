import React from 'react';

import './ArtCard.css'
import { Link } from 'react-router-dom';


export default function ArtCard({
    article
}) {
    return (
        <article className="card">
            <div className="img">
                <img
                    src={article.image}
                    alt="art"
                />
            </div>
            <article className="info">
                <div className="card-info city">
                    <h4>{article.city}</h4>
                </div>
                <div className="card-info date">
                    <p>{article.createdAt}</p>
                </div>
                <div className="card-info price">
                    <p>{article.price} $</p>
                </div>
                <div className="card-info likes">
                    <i className="fas fa-heart"> {article.liked.length} </i>
                </div>
                <div className="data-buttons">
                    <Link to={`/details/${article._id}`}
                        className="details-btn">
                        Details
                    </Link>
                </div>
            </article>
        </article>
    )
}
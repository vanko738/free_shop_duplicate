import React from 'react'
import './HomePage.css'

import homepage from '../../images/homepage.jpg';

export default function HomePage() {
    return (
        <section className="homePage">
            <article className="homePage-img">
                <img src={homepage} alt="" />
            </article>
            <article className="home-message">
                <div className="home-text-box">
                    <h1 className="home-message-title">I want to have ... everything</h1>
                    <p className="home-message-untertitle">The best free trade page !</p>
                </div>
            </article>
        </section>
    )
}

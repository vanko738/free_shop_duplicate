import React from 'react'

import './NotFoundPage.css';

export default function NotFoundPage() {
    return (
        <>
            <div className='wrong-page'>
                <img className='not-found-img' src={"images/notfound.png"} alt="not-found-page" />
                <h2 className='wrong-page-title'>Page not found</h2>
            </div>
        </>
    )
}


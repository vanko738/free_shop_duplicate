import React, { useEffect, useState } from 'react'

import './ServerError.css'

export default function ServerError(serverError) {

    const [visible, setIsvisible] = useState(false);

    useEffect(() => {
        if (!serverError.serverError) {
            setIsvisible(false)
            return;
        }
        setIsvisible(true);
        const timer = setTimeout(() => {
            setIsvisible(false)
        }, 5000)
        return () => clearTimeout(timer);
    }, [serverError])

    return (
        <>
            {visible ? <p className="rgsServError">{serverError.serverError}</p> : ''}
        </>
    )
}

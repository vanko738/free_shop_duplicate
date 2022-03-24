import React, { useEffect, useState } from 'react'

export default function MessageNot({ message, commentId }) {

    const [visible, setIsvisible] = useState(false);

    useEffect(() => {
        if (!message) {
            setIsvisible(false)
            return;
        }
        setIsvisible(true);
        const timer = setTimeout(() => {
            setIsvisible(false)
        }, 2000)
        return () => clearTimeout(timer);
    }, [commentId, message])

    return (
        <>
            {visible ? <p style={{ color: "green", 'fontSize': "12px" }}>{message}</p> : ''
            }
        </>
    )
}

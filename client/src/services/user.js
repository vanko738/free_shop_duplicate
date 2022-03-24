


export function register(data) {
    return fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    }).then(res => res.json());
}

export function login(data) {
    return fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    }).then(res => res.json());
}
export function logout() {
    return fetch('http://localhost:5000/auth/logout', {
        method: 'GET',
        credentials: 'include'
    })
}

export function sendMessage(data) {
    return fetch('http://localhost:5000/auth/sendMessage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    }).then(res => res.json());
}
export function getUserMessages(userId) {
    return fetch('http://localhost:5000/auth/getUserMessages/' + userId, {
        credentials: 'include',
    }).then(res => res.json());
}
export function getAllMessagesForCurrentArticle(artId, senderId) {
    return fetch('http://localhost:5000/auth/getAllMessagesForCurrentArticle/' + artId + "/" + senderId, {
        credentials: 'include',
    }).then(res => res.json());
}
export function deleteDiscussion(artId, recieverId, senderId) {
    return fetch('http://localhost:5000/auth/deleteDiscussion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ artId, recieverId, senderId })
    }).then(res => res.json());
}
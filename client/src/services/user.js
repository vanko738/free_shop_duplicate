const {REACT_APP_BASE_URL} = process.env;
 
export function register(data) {
    return fetch(`${REACT_APP_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    }).then(res => res.json());
}

export function login(data) {
    return fetch(`${REACT_APP_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    }).then(res => res.json());
}
export function logout() {
    return fetch(`${REACT_APP_BASE_URL}/auth/logout`, {
        method: 'GET',
        credentials: 'include'
    })
}

export function sendMessage(data) {
    return fetch(`${REACT_APP_BASE_URL}/auth/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    }).then(res => res.json());
}
export function getUserMessages(userId) {
    return fetch(`${REACT_APP_BASE_URL}/auth/getUserMessages/` + userId, {
        credentials: 'include',
    }).then(res => res.json());
}
export function getAllMessagesForCurrentArticle(artId, senderId) {
    return fetch(`${REACT_APP_BASE_URL}/auth/getAllMessagesForCurrentArticle/` + artId + "/" + senderId, {
        credentials: 'include',
    }).then(res => res.json());
}
export function deleteDiscussion(artId, recieverId, senderId) {
    return fetch(`${REACT_APP_BASE_URL}/auth/deleteDiscussion`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ artId, recieverId, senderId })
    }).then(res => res.json());
}
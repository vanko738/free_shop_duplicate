const {REACT_APP_BASE_URL} = process.env;

export function getAll() {
    return fetch(`${REACT_APP_BASE_URL}/products`)
        .then(res => res.json());
}

export function getByCategory(category) {
    return fetch(`${REACT_APP_BASE_URL}/products/${category}`)
        .then(res => res.json());
}

export function getById(id) {
    return fetch(`${REACT_APP_BASE_URL}/products/details/` + id)
        .then(res => res.json());
}
// Create  Article
export function createArticle(data) {
    return fetch(`${REACT_APP_BASE_URL}/products/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data)
    }).then(res => res.json());
}
// Create  Comments
export function createComment(data) {
    return fetch(`${REACT_APP_BASE_URL}/products/createComment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    }).then(res => res.json());
}
// Get All Comments
export function getArtComments(id) {
    return fetch(`${REACT_APP_BASE_URL}/products/details/comments/` + id)
        .then(res => res.json());
}

// Update Art

export function updateArticle(id, data) {
    return fetch(`${REACT_APP_BASE_URL}/products/edit/` + id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data)
    }).then(res => res.json());
}

// Delete Art

export function deleteArticle(id) {
    return fetch(`${REACT_APP_BASE_URL}/products/deleteArt/` + id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }).then(res => res.json());
}

// Add Like
export function addLike(data) {
    return fetch(`${REACT_APP_BASE_URL}/products/likeArt`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data)
    }).then(res => res.json());
}
// get my articles
export function getUserArticles(userId) {
    return fetch(`${REACT_APP_BASE_URL}/products/userArticles/` + userId)
        .then(res => res.json());
}
export function getUserLikedCreatedArticles(userId) {
    return fetch(`${REACT_APP_BASE_URL}/products/userLikedCreatedArt/` + userId)
        .then(res => res.json());
}
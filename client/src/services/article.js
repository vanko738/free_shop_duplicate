
export function getAll() {
    return fetch('http://localhost:5000/products')
        .then(res => res.json());
}

export function getByCategory(category) {
    return fetch(`http://localhost:5000/products/${category}`)
        .then(res => res.json());
}

export function getById(id) {
    return fetch('http://localhost:5000/products/details/' + id)
        .then(res => res.json());
}
// Create  Article
export function createArticle(data) {
    return fetch('http://localhost:5000/products/create', {
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
    return fetch('http://localhost:5000/products/createComment', {
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
    return fetch('http://localhost:5000/products/details/comments/' + id)
        .then(res => res.json());
}

// Update Art

export function updateArticle(id, data) {
    return fetch('http://localhost:5000/products/edit/' + id, {
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
    return fetch('http://localhost:5000/products/deleteArt/' + id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }).then(res => res.json());
}

// Add Like
export function addLike(data) {
    return fetch('http://localhost:5000/products/likeArt', {
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
    return fetch('http://localhost:5000/products/userArticles/' + userId)
        .then(res => res.json());
}
export function getUserLikedCreatedArticles(userId) {
    return fetch('http://localhost:5000/products/userLikedCreatedArt/' + userId)
        .then(res => res.json());
}
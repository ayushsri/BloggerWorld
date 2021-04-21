//Api to create
export const userCreate = (userId, token, post) => {
    return fetch(`${process.env.REACT_APP_BLOGGER_WORLD_URL}/post/new/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
//list the blog by page
export const blogList = page => {
    return fetch(`${process.env.REACT_APP_BLOGGER_WORLD_URL}/posts/?page=${page}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
//geting a single blog
export const exclusiveBlog = postId => {
    return fetch(`${process.env.REACT_APP_BLOGGER_WORLD_URL}/post/${postId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
//list the blogs by user
export const listByUser = (userId, token) => {
    return fetch(`${process.env.REACT_APP_BLOGGER_WORLD_URL}/posts/by/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
//remove the blog
export const remove = (postId, token) => {
    return fetch(`${process.env.REACT_APP_BLOGGER_WORLD_URL}/post/${postId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
//updating the blog

export const blogUpdate = (postId, token, post) => {
    console.log(postId, token, post);
    return fetch(`${process.env.REACT_APP_BLOGGER_WORLD_URL}/post/${postId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
//liking the post
export const doLike = (userId, token, postId) => {
    return fetch(`${process.env.REACT_APP_BLOGGER_WORLD_URL}/post/like`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, postId })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
//unliking the blogs
export const doUnlike = (userId, token, postId) => {
    return fetch(`${process.env.REACT_APP_BLOGGER_WORLD_URL}/post/unlike`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, postId })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
//writing comments
export const commentMake = (userId, token, postId, comment) => {
    return fetch(`${process.env.REACT_APP_BLOGGER_WORLD_URL}/post/comment`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, postId, comment })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
//Edit comments
export const commentChange = (userId, token, postId, comment) => {
    return fetch(`${process.env.REACT_APP_BLOGGER_WORLD_URL}/post/uncomment`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, postId, comment })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};



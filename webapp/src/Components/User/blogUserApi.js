//get user according to id
export const read = (userId, token) => {
    return fetch(`${process.env.REACT_APP_BLOGGER_WORLD_URL}/user/${userId}`, {
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
//get user if he is authenticate to do that
export const update = (userId, token, user) => {
    console.log("USER DATA UPDATE: ", user);
    return fetch(`${process.env.REACT_APP_BLOGGER_WORLD_URL}/user/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: user
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
//remove a user
export const remove = (userId, token) => {
    return fetch(`${process.env.REACT_APP_BLOGGER_WORLD_URL}/user/${userId}`, {
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

export const list = () => {
    return fetch(`${process.env.REACT_APP_BLOGGER_WORLD_URL}/users`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateUser = (user, next) => {
    if (typeof window !== "undefined") {
        if (localStorage.getItem("jwt")) {
            let auth = JSON.parse(localStorage.getItem("jwt"));
            auth.user = user;
            localStorage.setItem("jwt", JSON.stringify(auth));
            next();
        }
    }
};
//follow a user
export const follow = (userId, token, followId) => {
    return fetch(`${process.env.REACT_APP_BLOGGER_WORLD_URL}/user/follow`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, followId })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));                  
};
//unfollow a user
export const unfollow = (userId, token, unfollowId) => {
    return fetch(`${process.env.REACT_APP_BLOGGER_WORLD_URL}/user/unfollow`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, unfollowId })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
//find a user by id
export const findPeople = (userId, token) => {
    return fetch(`${process.env.REACT_APP_BLOGGER_WORLD_URL}/user/findpeople/${userId}`, {
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

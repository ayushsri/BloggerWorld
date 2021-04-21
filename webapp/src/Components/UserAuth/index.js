//api for user signup
export const userSignUp = user => {
    return fetch(`${process.env.REACT_APP_BLOGGER_WORLD_URL}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
//api for user signin
export const userSignIn = user => {
    return fetch(`${process.env.REACT_APP_BLOGGER_WORLD_URL}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
//api for user authenticating
export const authenticate = (jwt, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(jwt));
        next();
    }
};
//api for setting username
export const setUserName = (name, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('username', JSON.stringify(name));
        next();
    }
};
//api for signout
export const  signOut = next => {
    if (typeof window !== 'undefined') localStorage.removeItem('jwt');
    next();
    return fetch(`${process.env.REACT_APP_BLOGGER_WORLD_URL}/signout`, {
        method: 'GET'
    })
        .then(response => {
            console.log('signout', response);
            return response.json();
        })
        .catch(err => console.log(err));
};
//api to check is user is autherntic
export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }

    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
};

export const forgotPassword = email => {
    console.log('email: ', email);
    return fetch(`${process.env.REACT_APP_BLOGGER_WORLD_URL}/forgot-password/`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
        .then(response => {
            console.log('forgot password response: ', response);
            return response.json();
        })
        .catch(err => console.log(err));
};
//Api to reset password
export const resetPassword = resetInfo => {
    return fetch(`${process.env.REACT_APP_BLOGGER_WORLD_URL}/reset-password/`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(resetInfo)
    })
        .then(response => {
            console.log('forgot password response: ', response);
            return response.json();
        })
        .catch(err => console.log(err));
};

const express = require("express");
const {
    allUsers,
    getUser,
    updateUser,
    deleteUser,
    userPhoto,
    addFollowing,
    addFollower,
    removeFollowing,
    removeFollower,
    findPeople,
    hasAuthorization
} = require("../controllers/blog_user_Function");
const { require_sign_in } = require("../controllers/blog_authentication");

const route = express.Router();
route.put("/user/follow", require_sign_in, addFollowing, addFollower);
route.put("/user/unfollow", require_sign_in, removeFollowing, removeFollower);
route.get("/users", allUsers);
route.get("/user/:userId", require_sign_in, getUser);
route.put("/user/:userId", require_sign_in, hasAuthorization, updateUser);
route.delete("/user/:userId", require_sign_in, hasAuthorization, deleteUser);
route.get("/user/photo/:userId", userPhoto);
route.get("/user/findpeople/:userId", require_sign_in, findPeople);

module.exports = route;

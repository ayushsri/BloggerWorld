// User routes

const express = require("express");
const {
    user_By_Id,
    all_Users,
    get_User,
    update_User,
    delete_User,
    user_Photo,
    add_Following,
    add_Follower,
    remove_Following,
    remove_Follower,
    find_People,
    has_Authorization
} = require("../controllers/blog_user_function");
const { requireSignin } = require("../controllers/blog_authentication");

const router = express.Router();
router.put("/user/follow", requireSignin, add_Following, add_Follower);
router.put("/user/unfollow", requireSignin, remove_Following, remove_Follower);
router.get("/users", all_Users);
router.get("/user/:userId", requireSignin, get_User);
router.put("/user/:userId", requireSignin, has_Authorization, update_User);
router.delete("/user/:userId", requireSignin, has_Authorization, delete_User);
router.get("/user/photo/:userId", user_Photo);
router.get("/user/findpeople/:userId", requireSignin, find_People);
router.param("userId", user_By_Id);

module.exports = router;

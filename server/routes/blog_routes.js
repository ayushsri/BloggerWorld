// Blog routes

const express = require('express');
const {
    get_Posts,
    create_Post,
    posts_By_User,
    post_By_Id,
    isPoster,
    update_Post,
    delete_Post,
    photo,
    singlePost,
    like,
    unlike,
    comment,
    uncomment,
    update_Comment
} = require('../controllers/blog_post_function');
const { requireSignin } = require('../controllers/blog_authentication');
const { user_By_Id } = require('../controllers/blog_user_function');
const { create_Post_Validator } = require('../validator');

const router = express.Router();

router.get('/posts', get_Posts);
router.put('/post/like', requireSignin, like);
router.put('/post/unlike', requireSignin, unlike);
router.put('/post/comment', requireSignin, comment);
router.put('/post/uncomment', requireSignin, uncomment);
router.put('/post/updatecomment', requireSignin, update_Comment);
router.post('/post/new/:userId', requireSignin, create_Post, create_Post_Validator);
router.get('/posts/by/:userId', requireSignin, posts_By_User);
router.get('/post/:postId', singlePost);
router.put('/post/:postId', requireSignin, isPoster, update_Post);
router.delete('/post/:postId', requireSignin, isPoster, delete_Post);
router.get('/post/photo/:postId', photo);
router.param('userId', user_By_Id);
router.param('postId', post_By_Id);

module.exports = router;

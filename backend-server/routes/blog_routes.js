const express = require('express');
const {
    getBlogs,
    createPost,
    postsByUser,
    blogById,
    isPoster,
    updatePost,
    deletePost,
    photo,
    singlePost,
    like,
    unlike,
    comment,
    uncomment,
    updateComment
} = require('../controllers/blog_post_fucntions');
const { require_sign_in } = require('../controllers/blog_authentication');
const { userById } = require('../controllers/blog_user_Function');
const { create_post_validator } = require('../validator');

const route = express.Router();

route.get('/posts', getBlogs);
route.put('/post/like', require_sign_in, like);
route.put('/post/unlike', require_sign_in, unlike);
route.put('/post/comment', require_sign_in, comment);
route.put('/post/uncomment', require_sign_in, uncomment);
route.put('/post/updatecomment', require_sign_in, updateComment);
route.post('/post/new/:userId', require_sign_in, createPost, create_post_validator);
route.get('/posts/by/:userId', require_sign_in, postsByUser);
route.get('/post/:postId', singlePost);
route.put('/post/:postId', require_sign_in, isPoster, updatePost);
route.delete('/post/:postId', require_sign_in, isPoster, deletePost);
route.get('/post/photo/:postId', photo);
route.param('userId', userById);
route.param('postId', blogById);

module.exports = route;

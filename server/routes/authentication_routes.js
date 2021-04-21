// Authentication Routes

const express = require('express');
const { sign_up, sign_in, sign_out, forgot_Password, reset_Password, social_Login } = require('../controllers/blog_authentication');

const { user_Signup_Validator, user_Signin_Validator, password_Reset_Validator } = require('../validator');
const { user_By_Id } = require('../controllers/blog_user_function');

const router = express.Router();

router.post('/signup', user_Signup_Validator, sign_up);
router.post('/signin', user_Signin_Validator, sign_in);
router.get('/signout', sign_out);
router.put('/forgot-password', forgot_Password);
router.put('/reset-password', password_Reset_Validator, reset_Password);
router.post('/social-login', social_Login);
router.param('userId', user_By_Id);

module.exports = router;

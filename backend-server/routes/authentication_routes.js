const express = require('express');
const { sign_up, sign_in, sign_out, forgot_Password, reset_Password, social_account_Login } = require('../controllers/blog_authentication');

const { signup_validator, signin_validator, password_reset_validator } = require('../validator');
const { userById } = require('../controllers/blog_user_Function');

const route = express.Router();

route.post('/signup', signup_validator, sign_up);
route.post('/signin', signin_validator, sign_in);
route.get('/signout', sign_out);
route.put('/forgot-password', forgot_Password);
route.put('/reset-password', password_reset_validator, reset_Password);
route.post('/social-login', social_account_Login);
route.param('userId', userById);

module.exports = route;

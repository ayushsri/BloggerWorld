const express = require('express');
const { signup, signin, signout, forgotPassword, resetPassword, socialLogin } = require('../controllers/auth');

// import password reset validator
const { userSignUpValidator, userSignInValidator, passwordResetValidator } = require('../validator');
const { userById } = require('../controllers/user');

const router = express.Router();

// signin, singup and signout
router.post('/signup', userSignUpValidator, signup);
router.post('/signin', userSignInValidator, signin);
router.get('/signout', signout);

// password forgot and reset routes
router.put('/forgot-password', forgotPassword);
router.put('/reset-password', passwordResetValidator, resetPassword);

// then use this route for social login
router.post('/social-login', socialLogin);

// any route containing :userId, our app will first execute userByID()
router.param('userId', userById);

module.exports = router;

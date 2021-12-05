const express = require('express');
const { signup, signin, getUserInfo, forgotPassword, resetPassword } = require('../controllers/auth');
const { requireSignin } = require('../middlewares');
const { validateSignupRequest,
    validateSigninRequest,
    validateForgotPasswordRequest,
    validateResetPasswordRequest,
    isValidatedRequest } = require('../validators/auth');

const router = express.Router();

router.post('/signup', validateSignupRequest, isValidatedRequest, signup);
router.post('/signin', validateSigninRequest, isValidatedRequest, signin);
router.get('/getUserInfo', requireSignin, validateSigninRequest, isValidatedRequest, getUserInfo);
router.post('/forgotPassword', validateForgotPasswordRequest, isValidatedRequest, forgotPassword);
router.post('/resetPassword', requireSignin, validateResetPasswordRequest, isValidatedRequest, resetPassword);


module.exports = router;
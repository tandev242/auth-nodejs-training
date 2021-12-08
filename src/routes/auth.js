const express = require('express');
const { signup, signin, forgotPassword, resetPassword } = require('../controllers/auth');
const { validateSignupRequest,
    validateSigninRequest,
    validateForgotPasswordRequest,
    validateResetPasswordRequest,
    isValidatedRequest } = require('../validators/auth');

const router = express.Router();

router.post('/signup', validateSignupRequest, isValidatedRequest, signup);
router.post('/signin', validateSigninRequest, isValidatedRequest, signin);
router.post('/forgotPassword', validateForgotPasswordRequest, isValidatedRequest, forgotPassword);
router.post('/resetPassword', validateResetPasswordRequest, isValidatedRequest, resetPassword);


module.exports = router;
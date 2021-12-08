const { check, validationResult } = require('express-validator');

exports.validateSignupRequest = [
    check('email')
        .isEmail()
        .withMessage('Valid Email is required'),

    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 character long')
        .custom(async (password, { req }) => {
            const confirmPassword = req.body.confirmPassword
            // If password and confirm password not same
            // don't allow to sign up and throw error
            if (password !== confirmPassword) {
                throw new Error('Password and confirm password do not match')
            }
        }),
];

exports.validateSigninRequest = [
    check('email')
        .isEmail()
        .withMessage('Valid Email is required'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 character long')
];


exports.validateForgotPasswordRequest = [
    check('email')
        .isEmail()
        .withMessage('Valid Email is required'),
];

exports.validateResetPasswordRequest = [
    check('email')
        .isEmail()
        .withMessage('Valid Email is required'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 character long')
        .custom(async (password, { req }) => {
            const confirmPassword = req.body.confirmPassword
            // If password and confirm password not same
            // don't allow to reset and throw error
            if (password !== confirmPassword) {
                throw new Error('Password and confirm password do not match')
            }
        }),
    check('otpCode')
        .isLength(6)
        .withMessage('Otp code must be a 6 digit number')
        .isDecimal()
        .withMessage('Otp code must be a 6 digit number')
];



exports.isValidatedRequest = (req, res, next) => {
    const errors = validationResult(req);
    // Throwing first error after validated request
    if (errors.array().length > 0) {
        return res.status(400).json({ error: errors.array()[0].msg })
    }
    next();
}
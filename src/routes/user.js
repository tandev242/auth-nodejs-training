const express = require('express');
const { getUserInfo } = require('../controllers/user');
const { requireSignin } = require('../middlewares');

const router = express.Router();

router.get('/getUserInfo', requireSignin, getUserInfo);

module.exports = router;
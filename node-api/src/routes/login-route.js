'use strict';

const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login-controller');
const authService = require('../services/auth-service');

//login
router.post('/', loginController.authenticate);
router.post('/refresh-token', authService.authorize, loginController.refreshToken);

module.exports = router;
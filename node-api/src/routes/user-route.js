'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const loginController = require('../controllers/login-controller');
const authService = require('../services/auth-service');

// create
router.post('/', userController.post);

//list
router.get('/', userController.get);
router.get('/:_id', userController.getUserById);

// update
router.put('/:_id', authService.authorize, userController.put);

// delete
router.delete('/', authService.authorize, userController.delete);

module.exports = router;
'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');

// create
router.post('/', userController.post);

//list
router.get('/', userController.get);
router.get('/:_id', userController.getUserById);

// update
router.put('/:_id', userController.put)

// delete
router.delete('/:id', userController.delete)

module.exports = router;
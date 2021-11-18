const express = require('express');
const router = express.Router();
// const { bakeryUserRef, auth } = require('../../firestoreConfig');
const UserController = require('../controller/userController');

router.post('/signup', UserController.signUp);
router.post('/signin', UserController.signIn);

module.exports = router;
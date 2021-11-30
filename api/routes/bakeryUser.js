const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
// const { bakeryUserRef, auth } = require('../../firestoreConfig');
const UserController = require('../controller/userController');

router.post('/signup', UserController.signUp);
router.post('/signin', UserController.signIn);
router.patch('/devicetoken', checkAuth, UserController.updateDeviceToken);
router.get('/signout', UserController.signOutUser)

module.exports = router;
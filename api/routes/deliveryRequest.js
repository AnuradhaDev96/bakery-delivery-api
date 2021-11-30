const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const DeliveryRequestController = require('../controller/deliveryRequest')

router.post('/', checkAuth, DeliveryRequestController.addRequest);

module.exports = router;
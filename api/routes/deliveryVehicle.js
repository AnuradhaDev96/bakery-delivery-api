const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const DeliveryVehicleController = require('../controller/deliveryVehicle')

router.post('/', checkAuth, DeliveryVehicleController.addDeliveryVehicle);

module.exports = router;

const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const InstantOrderController = require('../controller/instantOrder')

router.post('/', checkAuth, InstantOrderController.addOrder);
router.patch('/modifystatusc/:orderId', checkAuth, InstantOrderController.changeOrderStatusByCustomer);
router.patch('/modifystatusr/:orderId', checkAuth, InstantOrderController.changeOrderStatusByRider);


module.exports = router;
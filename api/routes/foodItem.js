const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const FoodItemController = require('../controller/foodItem')

router.post('/', checkAuth, FoodItemController.addFoodItem);

module.exports = router;

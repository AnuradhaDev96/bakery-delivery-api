const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const InstantOrderController = require('../controller/instantOrder')

router.post('/', checkAuth, InstantOrderController.addOrder);
router.post('/initcart', checkAuth, InstantOrderController.initializeNewCartWithItem);
router.post('/cartitem', checkAuth, InstantOrderController.saveItemInShoppingCart);
router.get('/:cartId', checkAuth, InstantOrderController.getCartItemsByCartId);

module.exports = router;
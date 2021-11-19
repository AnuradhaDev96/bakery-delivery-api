const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const ShoppingCartController = require('../controller/shoppingCart');

router.post('/initcart', checkAuth, ShoppingCartController.initializeNewCartWithItem);
router.post('/cartitem', checkAuth, ShoppingCartController.saveItemInShoppingCart);
router.get('/:cartId', checkAuth, ShoppingCartController.getCartItemsByCartId);

module.exports = router;
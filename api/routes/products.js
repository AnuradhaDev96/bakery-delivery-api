const express = require('express');
const router = express.Router();
// const { productsRef } = require('../../firestoreConfig');
const { firestore } = require('../../configuration/firebaseClientConfig');
const checkAuth = require('../middleware/checkAuth');
const ProductController = require('../controller/productController');

router.get('/', checkAuth, ProductController.getAllProducts);
router.post('/', checkAuth, ProductController.addProduct);
router.get('/:productId', checkAuth, ProductController.getProductById);
router.patch('/:productId', checkAuth, ProductController.updateProduct);
router.delete('/:productId', checkAuth, ProductController.deleteProduct);

module.exports = router;
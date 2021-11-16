const express = require('express');
const router = express.Router();
const productsRef = require('../../firestoreConfig');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
});

// router.post('/', addProduct);

router.post('/', async (req, res, next) => {
    let productData = {
        brand: req.body.brand,
        type: req.body.type
    };
    try {
        await productsRef.doc().set(
            productData
        );
        res.status(201).json({
            message: 'Handling POST requests to /products',
        });
    } catch (error) {
        console.log(error);
        // db.collection("Products").a
        res.status(400).json({
            message: 'error',

        });
    }
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if (id === 'special') {
        res.status(200).json({
            message: 'You discovered the special id',
            id: id
        });
    } else {
        res.status(404).json({
            message: 'product id is invalid'
        });
    }
});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Product updated successfully'
    })
});

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Product Deleted'
    });
})

module.exports = router;
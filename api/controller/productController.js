// const firestoreDb = require('../../firestoreConfig');

const addProduct = async (req, res, next) => {
    // const admin = require("firebase-admin");
    // const serviceAccount = require('../../serviceAccount/serviceAccount.json');
    // firebaseApp = admin.initializeApp({
    //     credential: admin.credential.cert(serviceAccount)
    // });
    // const { getFirestore } = require('firebase-admin/firestore');
    // const db = getFirestore(firebaseApp);
    try {
        const product = {
            name: req.body.name,
            type: req.body.type
        };
        // await db.collection('Products').doc().set(product);
        // await firestoreDb.collection('Products').doc().set(product);
        res.status(201).json({
            message: 'Handling POST requests to /products',
            product: product
        });
    } catch (error) {
        // db.collection("Products").a
        res.status(201).json({
            message: 'Handling POST requests to /products',
            product: product
        });
    }
};

module.exports = {
    addProduct
};
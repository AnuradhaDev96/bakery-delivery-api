const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require('./serviceAccount/serviceAccount.json');

initializeApp({
    credential: cert(serviceAccount),
    databaseURL: 'https://bakery-delivery-bc6b9-default-rtdb.firebaseio.com/'
});

const db = getFirestore();
const productsRef = db.collection('Products');

module.exports = productsRef;
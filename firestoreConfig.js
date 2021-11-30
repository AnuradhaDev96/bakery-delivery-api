const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const { getAuth } = require('firebase-admin/auth');
const { getMessaging } = require('firebase-admin/messaging')
const serviceAccount = require('./serviceAccount/serviceAccount.json');

initializeApp({
    credential: cert(serviceAccount),
    databaseURL: 'https://bakery-delivery-bc6b9-default-rtdb.firebaseio.com/'
});

const db = getFirestore();
const auth = getAuth();
const fcm = getMessaging();
// const userI = auth.createUser()

const productsRef = db.collection('Products');
const bakeryUserRef = db.collection('BakeryUser');

module.exports = {
    productsRef,
    bakeryUserRef,
    auth,
    fcm
};
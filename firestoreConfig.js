const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const { getAuth } = require('firebase-admin/auth');
const { getMessaging } = require('firebase-admin/messaging');
const hostConfig = require('./configuration/hostConfig');

initializeApp({
    credential: cert(hostConfig.hostingServiceAccount),
    databaseURL: hostConfig.hostingDatabaseUrl
});
const db = getFirestore();
const auth = getAuth();
const fcm = getMessaging();

const productsRef = db.collection('Products');
const bakeryUserRef = db.collection('BakeryUser');

module.exports = {
    productsRef,
    bakeryUserRef,
    auth,
    fcm
};
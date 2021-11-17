const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const { getFirestore } = require('firebase/firestore/lite')

const firebaseConfig = {
    apiKey: "AIzaSyBRNs-b3nklxihcIH4GEB_LNWT2e8Zw618",
    authDomain: "bakery-delivery-bc6b9.firebaseapp.com",
    databaseURL: "https://bakery-delivery-bc6b9-default-rtdb.firebaseio.com",
    projectId: "bakery-delivery-bc6b9",
    storageBucket: "bakery-delivery-bc6b9.appspot.com",
    messagingSenderId: "140907122190",
    appId: "1:140907122190:web:a1334c045c79d0cbbff65f",
    measurementId: "G-H0WJCEGQTK"
};

const firebaseClientApp = initializeApp(firebaseConfig);
const fAuth = getAuth(firebaseClientApp);
const firestore = getFirestore(firebaseClientApp);

// const user = signInWithEmailAndPassword()
module.exports = {
    fAuth,
    firestore
};




const express = require('express');
const router = express.Router();
// const { bakeryUserRef, auth } = require('../../firestoreConfig');
const { fAuth, firestore } = require('../../configuration/firebaseClientConfig');
const { signInWithEmailAndPassword, createUserWithEmailAndPassword } = require('firebase/auth');
const { collection, addDoc, query, where, limit, getDocs } = require('firebase/firestore/lite');


router.post('/signup', async (req, res, next) => {
    try {
        const createdUser = await createUserWithEmailAndPassword(fAuth, req.body.email, req.body.password);
        let userData = {
            uid: createdUser.user.uid,
            email: createdUser.user.email,
            fullName: req.body.fullName,
            userType: req.body.userType
        };
        await addDoc(collection(firestore, "BakeryUser"), userData);
        res.status(201).json({
            message: 'User created successfully',
            token: createdUser._tokenResponse.idToken,
            userData: {
                uid: createdUser.user.uid,
                email: createdUser.user.email
            }
        });
    } catch (error) {
        console.log(error);
        res.status(409).json({
            message: error.message,
        });
    }
});

router.post('/signin', async (req, res, next) => {
    try {
        // const user = await auth.getUserByEmail(req.body.email);
        const loggedUser = await signInWithEmailAndPassword(fAuth, req.body.email, req.body.password);
        // console.log(loggedUser.user);
        // let userData = {
        //     uid: user.uid,
        //     email: user.email,
        //     fullName: user.displayName,
        //     userType: req.body.userType
        // };
        // await bakeryUserRef.doc().set(
        //     userData
        // );
        // const userRef = collection(firestore, "BakeryUser");
        let userType;
        const userQuery = query(collection(firestore, "BakeryUser"), where("uid", "==", loggedUser.user.uid), limit(1));
        await getDocs(userQuery).then((querySnapshot) => { 
            querySnapshot.forEach((snapshot) =>{
                console.log(snapshot.data());
                userType = snapshot.data().userType;
            });
        });
        // console.log(userDetails.data());

        res.status(200).json({
            message: 'Authentication Successful',
            token: loggedUser._tokenResponse.idToken,
            userData: {
                uid: loggedUser.user.uid,
                email: loggedUser.user.email,
                userType: userType
            }
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: 'User does not exist',
        });
    }
});

module.exports = router;
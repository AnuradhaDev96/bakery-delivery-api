const { fAuth, firestore } = require('../../configuration/firebaseClientConfig');
const { collection, addDoc, query, where, limit, getDocs, updateDoc, doc } = require('firebase/firestore/lite');
const { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } = require('firebase/auth');

const signUp = async (req, res, next) => {
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
};

const signIn = async (req, res, next) => {
    try {
        // const user = await auth.getUserByEmail(req.body.email);
        const loggedUser = await signInWithEmailAndPassword(fAuth, req.body.email, req.body.password);
        let userType;
        let fullName;
        const userQuery = query(collection(firestore, "BakeryUser"), where("uid", "==", loggedUser.user.uid), limit(1));
        await getDocs(userQuery).then((querySnapshot) => {
            querySnapshot.forEach((snapshot) => {
                console.log(snapshot.data());
                userType = snapshot.data().userType;
                fullName = snapshot.data().fullName;
            });
        });
        // console.log(userDetails.data());

        res.status(200).json({
            message: 'Authentication Successful',
            token: loggedUser._tokenResponse.idToken,
            userData: {
                uid: loggedUser.user.uid,
                email: loggedUser.user.email,
                userType: userType,
                fullName: fullName
            }
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: 'User does not exist'
        });
    }
};

const updateDeviceToken = async (req, res, next) => {
    // const id = req.params.productId;
    let userDocId;
    // const upTime = Timestamp.fromDate(new Date()).toDate();
    try {
        const userQuery = query(collection(firestore, "BakeryUser"), where("uid", "==", req.userData.uid), limit(1));
        await getDocs(userQuery).then((querySnapshot) => {
            querySnapshot.forEach((snapshot) => {
                console.log(snapshot.id);
                userDocId = snapshot.id;
            });
        });


        await updateDoc(doc(firestore, "BakeryUser", userDocId), {
            deviceToken: req.body.deviceToken
        });
        res.status(204).json({
            message: 'Device token updated successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: 'User does not exist',
        });
    }

};

const signOutUser = async (req, res, next) => {
    try {
        await signOut(fAuth);
        res.status(200).json({
            message: 'Signed out successfully'
        });
    } catch (error) {
        res.status(401).json({
            message: 'User does not exist'
        });
    }
}

module.exports = {
    signUp,
    signIn,
    updateDeviceToken,
    signOutUser
}
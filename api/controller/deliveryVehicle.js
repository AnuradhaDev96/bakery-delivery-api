const { firestore } = require('../../configuration/firebaseClientConfig');
const { collection, addDoc, getDocs, doc, getDoc, serverTimestamp } = require('firebase/firestore/lite');

const addDeliveryVehicle = async (req, res, next) => {
    const data = {
        displayName: req.body.displayName,
        plateNumber: req.body.plateNumber,
        vehicleColor: req.body.vehicleColor,
        vehicleType: req.body.vehicleType,
        createdBy: req.userData.uid,
        createdOn: serverTimestamp()
    };
    try {
        await addDoc(collection(firestore, "DeliveryVehicle"), data).then((savedItem) => {
            // const productId = savedItem.id;
            res.status(201).json({
                message: 'Vehicle saved successfully',
                savedId: savedItem.id
                // userData: req.userData
            });
        });
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

module.exports = {
    addDeliveryVehicle
}

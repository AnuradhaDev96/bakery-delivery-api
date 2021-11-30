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

const getAllDeliveryVehicles = async (req, res, next) => {
    try {
        await getDocs(collection(firestore, "DeliveryVehicle")).then((querySnapshot) => {
            // querySnapshot.forEach((snapshot) => {
            //     console.log(snapshot.id);
            // });
            const result = querySnapshot.docs.map((doc) => {
                // doc.data()
                return { id: doc.id, ...doc.data() };
            });
            res.status(200).json({
                data: result
            });
        });
    } catch (error) {
        res.status(401).json({
            message: "No vehicles available"
        });
    }
};

module.exports = {
    addDeliveryVehicle,
    getAllDeliveryVehicles
}

const { firestore } = require('../../configuration/firebaseClientConfig');
const { collection, addDoc, getDocs, doc, getDoc, serverTimestamp, runTransaction, query, GeoPoint, updateDoc } = require('firebase/firestore/lite');
const { fcm } = require('../../firestoreConfig');

const addRequest = async (req, res, next) => {
    // calculate(sd);
    try {
        const data = {
            riderId: req.body.riderId,
            deliveryLocation: new GeoPoint(req.body.deliveryLocation.latitude, req.body.deliveryLocation.longitude),
            orderStatus: "PENDING",
            createdBy: req.userData.uid,
            createdOn: serverTimestamp(),
            updatedBy: req.userData.uid,
            updatedOn: serverTimestamp()
        }
        const savedRequest = await addDoc(collection(firestore, "DeliveryRequests"), data);
        const payload = {
            notification: {
                title: "New delivery request",
                body: 'You have new delivery request',
                clickAction: 'FLUTTER_NOTIFICATION_CLICK'
            },
            data: {
                userId: req.userData.uid ?? '',
                requestId: savedRequest.id ?? '',
                riderId: driverId ?? '',
                type: 'NEW_DELIVERY'
            }
        }

        console.log("device token:" + req.body.deviceToken);
        fcm.sendToDevice(req.body.deviceToken, payload).catch(error => {
            res.status(400).json({
                message: 'Error in sending message'
            });
        })
        // console.log(savedOrder.id);
        // console.log(finalPrice);
        // const result = tot;
        res.status(201).json({
            message: 'Request sent successfully',
            requestId: savedRequest.id
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: error
        });
    }
};

module.exports = {
    addRequest
}

//Methods for Instant Order are implemented here
//TO-DO: Implement set current location of the user as delivery location.
//TO:DO: Sort out the orders for the driver by the closest distance
//TO:DO: Save the users current location and driver listen to them while driving and receive notfications
//TO:DO: prefered drivers - make pre orders.

//FUTURE WORK: preorder feaure with saved routes of drivers and list them to customer

const { firestore } = require('../../configuration/firebaseClientConfig');
const { collection, addDoc, getDocs, doc, getDoc, serverTimestamp, runTransaction, query, GeoPoint, updateDoc } = require('firebase/firestore/lite');

const addOrder = async (req, res, next) => {
    // calculate(sd);
    try {
        const itemDocs = await getDocs(collection(firestore, "ShoppingCart", req.body.shoppingCartId, "CartItems"));
        const cartDoc = await getDoc(doc(firestore, "ShoppingCart", req.body.shoppingCartId));
        console.log(req.body.deliveryLocation.latitude);
        let finalPrice = 0;
        itemDocs.docs.forEach((doc) => {
            finalPrice += doc.data().lotPrice;
            // console.log(finalPrice);
        });
        const data = {
            vehicleId: cartDoc.data().vehicleId,
            cartId: cartDoc.id,
            finalPrice: finalPrice, 
            deliveryLocation: new GeoPoint(req.body.deliveryLocation.latitude, req.body.deliveryLocation.longitude),
            orderStatus: "PENDING",
            createdBy: req.userData.uid,
            createdOn: serverTimestamp(),
            updatedBy: req.userData.uid,
            updatedOn: serverTimestamp()
        }
        const savedOrder = await addDoc(collection(firestore, "InstantOrders"), data);
        // console.log(savedOrder.id);
        // console.log(finalPrice);
        // const result = tot;
        res.status(200).json({
            orderId: savedOrder.id,
            finalPrice: finalPrice
        });
            
    } catch (error) {
        console.log(error);
        res.status(401).json({
            
            message: "No items available"
        });
    }
};

const changeOrderStatusByRider = async (req, res, next) => {
    const id = req.params.orderId;
    const orderStatus = req.body.orderStatus;
    // const upTime = Timestamp.fromDate(new Date()).toDate();
    if (orderStatus === "PENDING") {
        res.status(401).json({
            message: 'Permission denied for the requested action'
        });
    }    
    try {
        await updateDoc(doc(firestore, "InstantOrders", id), {
            orderStatus: orderStatus,
            updatedBy: req.userData.uid,
            updatedOn: serverTimestamp()
        });
        res.status(204).json({
            message: 'Order status change'
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: 'Order does not exist',
        });
    }

};

const changeOrderStatusByCustomer = async (req, res, next) => {
    const id = req.params.orderId;
    const orderStatus = req.body.orderStatus;
    // const upTime = Timestamp.fromDate(new Date()).toDate();
    if (orderStatus === "ARRIVED") {
        return res.status(401).json({
            message: 'Permission denied for the requested action'
        });
    }    
    try {
        await updateDoc(doc(firestore, "InstantOrders", id), {
            orderStatus: orderStatus,
            updatedBy: req.userData.uid,
            updatedOn: serverTimestamp()
        });
        res.status(204).json({
            message: 'Order status change'
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: 'Order does not exist',
        });
    }

};

module.exports = {
    addOrder,
    changeOrderStatusByRider,
    changeOrderStatusByCustomer
}
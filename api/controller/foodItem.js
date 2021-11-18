const { firestore } = require('../../configuration/firebaseClientConfig');
const { collection, addDoc, getDocs, doc, getDoc, serverTimestamp } = require('firebase/firestore/lite');

const addFoodItem = async (req, res, next) => {
    const vehicleId = req.body.vehicleId;
    const data = {
        itemName: req.body.itemName,
        price: req.body.price,
        description: req.body.description,
        ingredients: req.body.ingredients,
        createdBy: req.userData.uid,
        createdOn: serverTimestamp()
    };
    // console.log(data);
    // res.status(201).json({
    //     message: 'Vehicle saved successfully',
    //     data: data
    //     // userData: req.userData
    // });
    try {
        await addDoc(collection(firestore, "DeliveryVehicle", vehicleId, "FoodItems"), data).then((savedItem) => {
            // const productId = savedItem.id;
            res.status(201).json({
                message: 'Food item saved successfully',
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
    addFoodItem
}

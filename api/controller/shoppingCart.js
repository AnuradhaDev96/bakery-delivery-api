const { firestore } = require('../../configuration/firebaseClientConfig');
const { collection, addDoc, getDocs, doc, getDoc, serverTimestamp, runTransaction, query, GeoPoint } = require('firebase/firestore/lite');

const initializeNewCartWithItem = async (req, res, next) => {
    try {
        const data = {
            vehicleId: req.body.vehicleId,
            createdBy: req.userData.uid,
            createdOn: serverTimestamp()
        }
        const savedItem = await addDoc(collection(firestore, "ShoppingCart"), data);
        // const cartId = savedItem.id;
        const itemData = {
            foodId: req.body.foodId,
            vehicleId: req.body.vehicleId,
            quantity: req.body.quantity
        }
        const firestItem = await addDoc(collection(firestore, "ShoppingCart", savedItem.id, "CartItems"), itemData);
        res.status(201).json({
            shoppingCartId: savedItem.id,
            firestItemId: firestItem.id
        });
    } catch (error) {
        res.status(401).json({
            message: 'Not found'
        });
    }
};

const saveItemInShoppingCart = async (req, res, next) => {
    try {

        itemDocRef = doc(firestore, "DeliveryVehicle", req.body.vehicleId, "FoodItems", req.body.foodId);
        const itemDoc = await getDoc(itemDocRef);
        const lotPrice = itemDoc.data().price * req.body.quantity;
        // console.log(subTotal);

        const itemData = {
            foodId: req.body.foodId,
            vehicleId: req.body.vehicleId,
            quantity: req.body.quantity,
            lotPrice: lotPrice
        }
        const savedItem = await addDoc(collection(firestore, "ShoppingCart", req.body.cartId, "CartItems"), itemData);
        res.status(201).json({
            shoppingCartId: req.body.cartId,
            saveItemId: savedItem.id,
            lotPrice: lotPrice
        });
    } catch (error) {
        res.status(401).json({
            message: 'Item does not exist'
        });
    }
};

const getCartItemsByCartId = async (req, res, next) => {
    const cId = req.params.cartId;
    try {
        await getDocs(collection(firestore, "ShoppingCart", cId, "CartItems")).then((querySnapshot) => {
            // querySnapshot.forEach((snapshot) => {
            //     console.log(snapshot.id);
            // });
            let finalPrice = 0;

            const result = querySnapshot.docs.map((doc) =>{
                return { id: doc.id, ...doc.data() };
            });
            querySnapshot.docs.forEach((doc) => {
                finalPrice += doc.data().lotPrice;
            });
            // const result = tot;
            res.status(200).json({
                finalPrice: finalPrice,
                cartItems: result
            });
        });
    } catch (error) {
        res.status(401).json({
            message: "No items available"
        });
    }
};

module.exports = {
    initializeNewCartWithItem,
    saveItemInShoppingCart,
    getCartItemsByCartId
}
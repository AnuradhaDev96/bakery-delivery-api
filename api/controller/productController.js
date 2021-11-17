const { firestore } = require('../../configuration/firebaseClientConfig');
const { collection, addDoc, getDocs, doc, getDoc } = require('firebase/firestore/lite');

const getAllProducts = async (req, res, next) => {
    try {
        await getDocs(collection(firestore, "Products")).then((querySnapshot) => {
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
            message: "No products available"
        });
    }
};

const addProduct = async (req, res, next) => {
    const productData = {
        brand: req.body.brand,
        type: req.body.type,
        createdBy: req.userData.uid,
        createdOn: serverTimestamp()
    };
    try {
        await addDoc(collection(firestore, "Products"), productData).then((savedItem) => {
            const productId = savedItem.id;
            res.status(201).json({
                message: 'Product saved successfully',
                productId: productId
                // userData: req.userData
            });
        });
    } catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};

const getProductById = async (req, res, next) => {
    const id = req.params.productId;
    try {
        await getDoc(doc(firestore, "Products", id)).then((snapshot) => {
            const result = { id: snapshot.id, ...snapshot.data() };
            res.status(200).json({
                data: result
            });
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: 'Product does not exist',
        });
    }
};

const updateProduct = async (req, res, next) => {
    const id = req.params.productId;
    // const upTime = Timestamp.fromDate(new Date()).toDate();
    try {
        await updateDoc(doc(firestore, "Products", id), {
            brand: req.body.brand,
            type: req.body.type
        });
        res.status(204).json({
            message: 'Product updated successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: 'Product does not exist',
        });
    }

};

const deleteProduct = async (req, res, next) => {
    const id = req.params.productId;
    try {
        await deleteDoc(doc(firestore, "Products", id));
        res.status(204).json({
            message: 'Product Deleted'
        });
    } catch (error) {
        res.status(404).json({
            message: 'Product does not exist'
        });
    }
};

module.exports = {
    getAllProducts,
    addProduct,
    getProductById,
    updateProduct,
    deleteProduct
};

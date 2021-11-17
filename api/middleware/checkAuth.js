const { auth } = require('../../firestoreConfig');

module.exports = async (req, res, next) => {
    try {
        const idToken = req.headers.authorization.split(" ")[1];
        await auth.verifyIdToken(idToken).then((decodedToken) => {
            req.userData = decodedToken;
        });
        //TO-DO: Implement expired token 401 with refresh token ("code": "auth/id-token-expired")
        next();
    } catch (error) {
        let errorMessage;
        if (error.code === 'auth/id-token-expired') {
            // return res.status(401).json({
            //     message: 'Session expired for the token'
            // });
            errorMessage = 'Session expired for the token';
        } else { 
            errorMessage = error;
        }
        return res.status(401).json({
            message: errorMessage
        })
    }
}
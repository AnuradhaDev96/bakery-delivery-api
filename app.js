const express = require('express');
const app = express();
// const cors = require('cors')

//import routes
const productRoutes = require('./api/routes/products');
const userRoutes = require('./api/routes/bakeryUser');

//other plugins integrations
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//configure cors
// app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


//sub routes
app.use('/products', productRoutes);
app.use('/auth', userRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

// app.use((req, res, next) => {
//     res.status(200).json({
//         message: 'It works!'
//     });
// });

module.exports = app;
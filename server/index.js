const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
// dotenv.config()
const app = express()

// import routes
const userRouter = require('./routes/coreRoutes/userRoutes.js');
const productRouter = require('../server/routes/coreRoutes/productRoutes')


const PORT = process.env.PORT || 5002

app.use(bodyParser.json())
app.use(cors())


//CONNECT DB
mongoose.connect(`mongodb+srv://laonhi100:200145LUC@osm-shop.2wnnbil.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        console.log('connect DB success');
    })
    .catch((err) => {
        console.log(err);
    })


// API
app.get('/', (req, res) => {
    return res.send('OSM')
});
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})


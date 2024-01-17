const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
// dotenv.config()
const app = express()

// import routes
const userRouter = require('../server/routes/coreRoutes/userRoutes');
const productRouter = require('../server/routes/coreRoutes/productRoutes');
const orderRouter = require('../server/routes/coreRoutes/orderRoutes');
const transactionRouter = require('../server/routes/coreRoutes/transactionRoutes');
const categoryRouter = require('../server/routes/coreRoutes/categoryRoutes')

const PORT = process.env.PORT || 5000

app.use(express.static("public"))
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
app.use("/api/v1/oder", orderRouter);
app.use("/api/v1/transaction", transactionRouter);
app.use("/api/v1/category", categoryRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})


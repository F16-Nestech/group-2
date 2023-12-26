const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const bodyParser = require('body-parser')
dotenv.config()
const app = express();

// import routes
const userRouter = require('../server/routes/coreRoutes/userRoutes');
const productRouter = require('../server/routes/coreRoutes/productRoutes')



const PORT = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())

//CONNECT DB
mongoose.connect(`${process.env.MONGO_DB}`)
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


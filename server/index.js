const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const app = express()

// import routes
const userRouter = require('./routes/coreRoutes/userRoutes');
const productRouter = require('./routes/coreRoutes/productRoutes.js');
const orderRouter = require('./routes/coreRoutes/orderRoutes.js');
const invoiceRouter = require('./routes/coreRoutes/invoiceRoutes.js');
const paymentRouter = require('./routes/coreRoutes/paymentRoutes.js');


const PORT = process.env.PORT || 5000

app.use(express.static("public"))
app.use(bodyParser.json())
app.use(cors({
  origin: '*',
  credentials: true // Enable credentials
}));

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));


mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


// API
app.get('/', (req, res) => {
    return res.send('OSM')
});
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/invoices", invoiceRouter);
app.use("/api/v1/payments", paymentRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})


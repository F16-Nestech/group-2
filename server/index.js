import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'

import {productRoutes} from './routes/products.js'

import {authRoutes} from './routes/auth.js'


const app = express()
mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
})

app.use(cors())
app.use(bodyParser.json())

app.get("/api/v1/healthchk", (req, res) => {
    res.status(200).json("hello");
  });

app.use('/products', productRoutes)
app.use('/auth', authRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

const express = require('express');
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
const routes = require('./routes/index')
dotenv.config()


const bodyParser = require('body-parser')
// import cors from 'cors'

// import productRoutes from './routes/products'

// import authRoutes from './routes/auth'


const app = express()
const PORT = process.env.PORT || 5000

app.use(bodyParser.json())

routes(app)

app.get('/', (req, res) => {
    return res.send('OSM')
})

mongoose.connect(`${process.env.MONGO_DB}`)
    .then(() => {
        console.log('connect DB success');
    })
    .catch((err) => {
        console.log(err);
    })

// app.use(cors())

// app.use('/products', productRoutes)
// app.use('/auth', authRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

const express = require('express');
const dotenv = require('dotenv');
dotenv.config()


// import mongoose from 'mongoose'
// import bodyParser from 'body-parser'
// import cors from 'cors'

// import productRoutes from './routes/products'

// import authRoutes from './routes/auth'


const app = express()
// mongoose.connect('mongodb://localhost:27017/group2', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
// })

app.get('/', (req, res) => {
    return res.send('OSM')
})

// app.use(cors())
// app.use(bodyParser.json())

// app.use('/products', productRoutes)
// app.use('/auth', authRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

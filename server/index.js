const express = require('express');
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
dotenv.config()

// import routes
const userRouter = require('../server/routes/business/userRoutes');

const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 5001

app.use(bodyParser.json())

// routes(app)

mongoose.connect(`${process.env.MONGO_DB}`)
    .then(() => {
        console.log('connect DB success');
    })
    .catch((err) => {
        console.log(err);
    })

// app.use(cors())

// API
app.get('/', (req, res) => {
    return res.send('OSM')
});
app.use('/api/v1/users', userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

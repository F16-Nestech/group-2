require('dotenv').config();
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const { flash } = require('express-flash-message');
const session = require('express-session')
const connectDB = require('../server/database/db');


const app = express();
const PORT = process.env.PORT || 7000;

//connect to database
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//static files
app.use(express.static('assets'))

//express session
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
        }
    })
);

// //Flash message
// app.use(flash({ sessionKeyName: 'express-flash-message' }));


//Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

//Routes
app.use('/', require('./routes/customer'));

//error 404
app.get('*', (req, res) => {
    res.status(404).render('404');
});

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});

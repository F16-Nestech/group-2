
const express = require("express");
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const path = require('path');


const app = express();

dotenv.config({ path: 'config.env' })
const port = process.env.PORT || 8000

//log requests
app.use(morgan('tiny'));

app.use(bodyParser.urlencoded({ extended: true }));

//set view engine
app.set("view engine", "ejs");

//load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));


//load routers
app.use('/', require("./routes/router"))
app.listen(port, () => { console.log(`Server is running in port ${port}`) });

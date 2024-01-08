const express = require("express");
const authController = require("../../controllers/authController")
const authJwt = require('../../middleware/authJwt')

const router = express.Router()

router

    .post("/register", authController.registerUser) //SignUp User
    .post("/log-in", authController.loginUser) // Log-In User

module.exports = router;

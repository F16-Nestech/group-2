const express = require("express");
const authController = require("../../controllers/authController")
const authJwt = require('../../middleware/authJwt')

const router = express.Router()

router

    .post("/api/signup", authController.registerUser) //SignUp User
    .post("/api/signin", authController.loginUser) // Log-In User

module.exports = router;

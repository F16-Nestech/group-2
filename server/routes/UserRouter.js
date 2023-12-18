const express = require("express");
const router = express.Router()
const userController = require('../controllers/userController/createUser');

router.post('/', userController.createUser)

module.exports = router;
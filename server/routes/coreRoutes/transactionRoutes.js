const express = require('express');
const transactionController = require('../../controllers/transactionController');

const router = express.Router()

router.post("/create", transactionController.processPayment);

module.exports = router;

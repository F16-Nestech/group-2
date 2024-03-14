const express = require('express');
const paymentController = require('../../controllers/paymentController');

const router = express.Router()

//add a payment
router.post("/create", paymentController.createPayment);

//get all payment
router.get("/list", paymentController.getPayments);

//delete payment
router.delete("/delete/:id", paymentController.deletePayment);

module.exports = router;

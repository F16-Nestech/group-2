const express = require('express');
const invoiceController = require('../../controllers/invoiceController');
const { route } = require('./userRoutes');

const router = express.Router()

//add an invoice
router.post("/create", invoiceController.addInvoice);

//get list invoices
router.get("/list", invoiceController.getInvoices);

//

module.exports = router;

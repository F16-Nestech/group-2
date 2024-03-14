const { default: mongoose } = require("mongoose");
const Invoice = require("../models/invoiceModel");

const invoiceController = {

    //add an invoice
    addInvoice: async (req, res) => {
        try {
            const { payment_method, order_id, items_price, shipping_price,
                promotion, total_price, client, paid_time, message } = req.body;
            
            if (!payment_method || !order_id || !items_price || !shipping_price ||
                !promotion || !total_price || !client ) {
                    return res.status(400).json({ message: 'Missing required fields.' });
                }

            const newInvoice = new Invoice({
                payment_method,
                order_id,
                items_price,
                shipping_price,
                promotion,
                total_price,
                client,
                paid_time,
                message,
            });
            const savedInvoice = await newInvoice.save();
            res.status(200).json(savedInvoice);
        } catch (err) {
            res.status(501).json(err);
        }
    },

    //Get all Invoices
    getInvoices: async (req, res) => {
        console.log('get all invoice');
        try {
            const allInvoice = await Invoice.find();
            res.status(200).json(allInvoice);
        } catch (err) {
            res.status(501).json(err);
        }
    },

}

module.exports = invoiceController;

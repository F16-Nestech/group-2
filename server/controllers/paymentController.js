const { default: mongoose } = require('mongoose');
const Payment = require('../models/paymentModel');

const paymentController = {
    //add payment
    createPayment: async (req, res) => {
        try {
            const { invoice_id, client, amount, date, payment_method } = req.body;
            if (!invoice_id || !client || !amount || !payment_method) {
                return res.status(400).json({
                    result: null,
                    success: false,
                    message: 'The input is required.'
                })
            }

            const newPayment = new Payment({ invoice_id, client, amount, date, payment_method });
            const savedPayment = await newPayment.save();

            res.status(200).json(savedPayment);
        } catch (err) {
            console.log(err);
            res.status(501).json({ success: false, message: 'error server' });
        }
    },

    //get all payments
    getPayments: async (req, res) => {
        try {
            const allPayment = await Payment.find();
            res.status(200).json(allPayment);
        } catch (err) {
            res.status(501).json(err);
        }
    },

    //delete payment
    deletePayment: async (req, res) => {
        try {
            const paymentId = req.params.id;
        
            if (!mongoose.Types.ObjectId.isValid(paymentId)) {
              return res.status(400).json({ message: 'Invalid Payment ID.' });
            }
        
            const deletedPayment = await Payment.findByIdAndDelete(paymentId);
        
            if (!deletedPayment) {
              return res.status(404).json({ message: 'Payment not found.' });
            }
        
            res.status(200).json(deletedPayment);
        } catch (err) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }


}



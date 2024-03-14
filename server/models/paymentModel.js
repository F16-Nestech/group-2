const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
    {
        invoice_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Invoice',
            required: true
        },
        client: { type: String, required: true },
        amount: { type: Number, required: true },
        date: {type: Date, default: Date.now },
        payment_method: { type: String, enum: ['cash', 'credit-card', 'e-wallet'], required: true },
    });

const Payment = mongoose.model('Payment', paymentSchema)

module.exports = Payment;

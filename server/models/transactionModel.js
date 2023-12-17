const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
    {
        payment_method: { type: String, enum: ['cash', 'credit-card', 'e-wallet'], required: true },
        itemsPrice: { type: Number, required: true },
        shippingPrice: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        User: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        //
        payment_info: { type: String },
        message: { type: String, maxlength: 200 },
        created: { type: Date, default: Date.now() },
        updated: { type: Date, default: Date.now() }
    });

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction;

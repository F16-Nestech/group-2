const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
    {
        payment_method: { type: String, enum: ['cash', 'credit-card', 'e-wallet'], required: true },
        itemsPice: { type: Number, required: true },
        shippingPrice: { type: Number, required: true },
        promotion: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        isPaid: { type: Boolean, default: false },
        paidTime: { type: Date },
        isDelivered: { type: Boolean, default: false },
        deliverTime: { type: Date },
        message: { type: String, maxlength: 200 },
        created: { type: Date, default: Date.now() },
        updated: { type: Date, default: Date.now() }
    });

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction;

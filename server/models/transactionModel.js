import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
    {
        order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Oder', required: true },
        status: { type: String, required: true },
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        user_name: { type: String, required: true },
        user_email: { type: String, required: true },
        user_phone: { type: String },
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        amount: { type: Number, required: true },
        payment_method: { type: String, required: true },
        payment_info: { type: String },
        message: { type: String },
        security: { type: String },
    },
    {
        timestamps: true
    });

const Transaction = mongoose.model('Transaction', transactionSchema)

export default Transaction
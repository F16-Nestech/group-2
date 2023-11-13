import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    transaction_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', required: true },
    status: { type: String, required: true },
});

const Order = mongoose.model('Order', orderSchema)

export default Order
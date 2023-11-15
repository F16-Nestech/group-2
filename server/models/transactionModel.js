import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
    {
        order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
        status: { type: String, enum: ['pending', 'completed', 'failed', 'canceled'], default: 'pending' },
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        user_name: { type: String, required: true },
        user_email: { 
            type: String, 
            required: true,
            validate: {
                validator: function (e) {
                  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
                },
                message: props => `${props.value} is not a valid email address!`
            }
        },
        user_phone: { 
            type: String,
            required: true,
            validate: {
                validator: function (v) {
                  return /^[0-9]{10}$/.test(v);
                },
                message: props => `${props.value} is not a valid phone number!`,
            }
        },
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        amount: { type: Number, required: true },
        payment_method: { type: String, enum: ['cash', 'credit-card', 'e-wallet'], required: true },
        payment_info: { type: String },
        message: { type: String, maxlength: 200 },
        created: { type: Date, default: Date.now() },
        updated: { type: Date, default: Date.now() }
    });

const Transaction = mongoose.model('Transaction', transactionSchema)

export default Transaction

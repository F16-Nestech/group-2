const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    status: { type: String, enum: ['success', 'fail', 'processing'] },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [
        {
            name: { type: String, required: true },
            amount: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            discount: { type: Number },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            }
        }
    ],
    shippingAddress: {
        address: { type: String, required: true },
        phone: {
            type: String,
            required: true,
            validate: {
                validator: function (v) {
                    return /^[0-9]{10}$/.test(v);
                },
                message: props => `${props.value} is not a valid phone number!`,
            }
        },
    },
    createAt: { type: Date, default: Date.now() },
    updateAt: { type: Date, default: Date.now() }
});

orderSchema.pre('find', function() {
    this.populate('orderItems.product', 'name price');
});

orderSchema.pre('findOne', function() {
    this.populate('orderItems.product', 'name price');
});

const Order = mongoose.model('Order', orderSchema)

module.exports = Order;

const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    }
});

const OrderItem = mongoose.model('cart', cartSchema);

module.exports = OrderItem;

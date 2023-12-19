const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true, default: 0.000 },
        content: { type: String, required: true },
        discount: { type: Number, required: true },
        image_link: { type: String },
        image_list: { type: [String] },
        created: { type: Date, default: Date.now() },
        updated: { type: Date, default: Date.now() },
        view: { type: Number, default: 0 }
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema)

module.exports = Product;


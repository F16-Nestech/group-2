const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        price: { type: Number, required: true, default: 0.000 },
        type: { type: String, required: true },
        countInstock: { type: Number, required: true },
        image_link: { type: String, required: true },
        image_list: { type: [String] },
        rating: { type: Number, required: true },
        description: { type: String },
        // created: { type: Date, default: Date.now() },
        // updated: { type: Date, default: Date.now() },
    },
    {
        timestamps: true,
    }
);

productSchema.plugin(uniqueValidator);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;


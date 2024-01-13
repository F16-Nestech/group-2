const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        price: { type: Number, required: true, default: 0.000 },
        category: { type: String, required: true },
        countInstock: { type: Number, required: true },
        image_link: { type: String, required: true },
        image_list: { type: [String] },
        rating: { type: Number, required: true },
        description: { type: String },
    },
    {
        timestamps: true,
    }
);

productSchema.plugin(uniqueValidator);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;


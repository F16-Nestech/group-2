import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        price: {type: Number, required: true, default: 0.000},
        content: {type: String},
        discount: {type: Number},
        image_link: {type: String, },
        image_list: {type: [String]},
        view: {type: Number, default: 0},
    },
    {
        timestamps: true,
    });

const Product = mongoose.model('Product', productSchema)

export default Product
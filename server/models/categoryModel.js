import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    parent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    sort_order: { type: Number, default: 0 },
});

const Category = mongoose.model('Category', categorySchema)

export default Category

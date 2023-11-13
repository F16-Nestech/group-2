import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: Number, required: true, unique: true },
        phone: { type: String },
        address: { type: String },
        password: { type: String, required: true },
        created: { type: Date, default: Date.now() },
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
    },
    {
        timestamps: true
    });

const User = mongoose.model('User', userSchema)

export default User
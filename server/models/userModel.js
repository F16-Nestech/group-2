const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (e) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
                },
                message: props => `${props.value} is not a valid email address!`
            }
        },
        phone: {
            type: String,
            validate: {
                validator: function (v) {
                    return /^[0-9]{10}$/.test(v);
                },
                message: props => `${props.value} is not a valid phone number!`,
            }
        },
        address: { type: String, maxlength: 100 },
        gender: { type: String },
        role: { type: String, default: 'user' },
        created: { type: Date, default: Date.now() },
        updated: { type: Date, default: Date.now() },
    }
);

const User = mongoose.model('User', userSchema)

module.exports = User;

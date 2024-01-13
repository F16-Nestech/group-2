const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const userSchema = new Schema(
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
            required: true,
            validate: {
                validator: function (v) {
                    return /^[0-9]{10}$/.test(v);
                },
                message: props => `${props.value} is not a valid phone number!`,
            },
            unique: true,
        },
        address: { type: String, maxlength: 100 },
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
        password: { type: String, required: true },
        confirmPassword: { type: String, required: true },
        access_token: { type: String, required: true },
        refresh_token: { type: String, required: true },
        created: { type: Date, default: Date.now() },
        updated: { type: Date, default: Date.now() },
    },
    {
        timestamps: true
    }
);

userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);

module.exports = User;

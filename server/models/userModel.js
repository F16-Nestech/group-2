import mongoose from 'mongoose';

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
        password: { type: String, required: true },
        created: { type: Date, default: Date.now() },
        updated: { type: Date, default: Date.now() },
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
    });

const User = mongoose.model('User', userSchema)

export default User

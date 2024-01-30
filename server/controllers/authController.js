const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authController = {
    //REGISTER
    registerUser: async (req, res, next) => {
        console.log('create user');
        try {
            let { name, email, phone, password, confirmPassword } = req.body;
            if (!name || !email || !phone || !password || !confirmPassword)
                return res.status(400).json({
                    success: false,
                    result: null,
                    message: "Name, Email , Phone or password  fields they don't have been entered.",
                })

            // Kiểm tra định dạng email   
            if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                return res.status(400).json({ message: 'invalid  email' })
            }

            //check mail chi ton tai duy nhat
            const existingEmailUser = await User.findOne({ email: email });
            if (existingEmailUser) {
                return res.status(400).json({ error: 'email already exists!' })
            }

            //Kiểm tra định dạng sđt
            if (!phone.match(/^\d{10,11}$/)) {
                return res.status(400).json({ message: 'invalid phone number' });
            }

            //check number phone chi ton tai duy nhat
            const existingPhoneUser = await User.findOne({ phone: phone });
            if (existingPhoneUser) {
                return res.status(400).json({ error: 'Phone Number already exists!' })
            }

            if (password !== confirmPassword) {
                return res.status(400).json({ message: 'The specified password does not match' })
            }

            //check long password
            if (password.length < 8)
                return res.status(400).json({
                    success: false,
                    result: null,
                    message: 'Password need to be at least 8 characters long',
                })

            //MA HOA PASSWORD 
            const hashedPassword = await bcrypt.hash(password, 10)
            req.body.password = hashedPassword;
            //Create new user
            const result = await new User(req.body).save({});
            if (!result) {
                return res.status(403).json({
                    success: false,
                    result: null,
                    message: "User couldn't save correctly",
                });
            }
            return res.status(200).send({
                success: true,
                result: {
                    _id: result._id,
                    name: result.name,
                    email: result.email,
                    phone: result.phone,
                    password: hashedPassword,
                    address: result.address,
                    role: result.role,
                },
                message: 'User is registered successfully.',
            })


        } catch (err) {
            res.status(501).json({ success: false, message: 'error server' });
        }
    },

    //GENERATE_TOKEN

    //accesstoken
    generateAccessToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "30s" }
        );
    },

    //refreshtoken
    generateRefreshToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_REFRESH_KEY,
            { expiresIn: "365d" }
        )
    },

    //LOGIN USER
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email })
            if (!user) {
                res.status(404).json({success: false, message: 'Wrong Email' })
            }
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                res.status(404).json({success: false, message: 'Wrong password' })
            }
            if (user && validPassword) {

                //Generate access token
                const Access_Token = authController.generateAccessToken(user)
                //Generate refresh token
                const Refresh_Token = authController.generateRefreshToken(user)

                return res.status(200).json({
                    success: true,
                    result: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        role: user.role,
                        address: user.address,
                        Access_Token, Refresh_Token
                    },
                    message: "Login Successfully!"
                });
            }
        } catch (err) {
            res.status(501).json({ success: false, message: 'Error server' });
        }
    }
}

module.exports = authController;

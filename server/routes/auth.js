import express from 'express'
import { body, validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const router = express.Router()

import User from '../models/userModel'

//Đăng ký Signup
router.post(
    '/signup',
    [ //Validation
        body('name').notEmpty().withMessage('Tên không được để trống'),
        body('email').isEmail().withMessage('Email không hợp lệ'),
        body('phone').isMobilePhone().withMessage('Số điện thoại không hợp lệ'),
        body('password').isLength({ min: 6 }).withMessage('Mật khẩu phải có ít nhất 6 ký tự'),
        body('confirmPassword').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Mật khẩu xác nhận không khớp')
            }
            return true
        })
    ],
    async (req, res) => {
        //Kiểm tra validation errors
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            const { name, email, phone, address, password } = req.body

            //Check email đã tồn tại chưa
            const existingUser = await User.findOne({ email })
            if(existingUser) {
                return res.status(400).json({ message: 'Email đã được sử dụng' })
            }

            //Mã hóa mật khẩu
            const hashedPassword = await bcrypt.hash(password, 10)

            //Tạo người dùng mới
            const newUser = new User({ name, email, phone, address, password: hashedPassword, created, updated, role })
            await newUser.save()

            res.status(201).json({ message: 'Đăng ký thành công' })
        } catch(error) {
            console.error(error)
            res.status(500).json({ message: 'Lỗi server' })
        }
})

//Đăng nhập Login
router.post('/login',
    [
        body('email').isEmail().withMessage('Email không hợp lệ'),
        body('password').isLength({ min: 6 }).withMessage('Mật khẩu phải có ít nhất 6 ký tự'),
    ],
    async (req, res) => {
        try {
            //Kiểm tra validation errors
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }

            const { email, password } = req.body

            //Tìm tài khoản trong csdl
            const user = await User.findOne({ email })
            if(!user) {
                return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' })
            }

            //So sánh mật khẩu
            const isPasswordValid = await bcrypt.compare(password, user.password)
            if(!isPasswordValid) {
                return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' })
            }

            //Tạo token
            const token = jwt.sign(
                { userId: user._id, email: user.email, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            )

            res.status(200).json({ token })
        } catch(error) {
            console.error(error)
            res.status(500).json({ message: 'Lỗi server' })
        }
})

import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/userModel'

const router = express.Router()

//Middleware validation cho API đăng ký
const validateSignup = (req, res) => {
    const { name, email, phone, address, password, confirmPassword } = req.body

    //Kiểm tra các trường có giá trị không
    if (!name || !email || !phone || !address || !password || !confirmPassword) {
        return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' })
    }
    
    // Kiểm tra định dạng email
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        return res.status(400).json({ message: 'Email không hợp lệ' })
    }
    //Kiểm tra định dạng sđt
    if (!phone.match(/^\d{10,11}$/)) {
        return res.status(400).json({ message: 'Số điện thoại không hợp lệ' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'Mật khẩu phải có ít nhất 6 ký tự' })
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Mật khẩu xác nhận không khớp' })
    }
}

//Middleware validation cho API đăng nhập
const validateLogin = (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' })
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        return res.status(400).json({ message: 'Email không hợp lệ' });
    }
}

//Đăng ký Signup
router.post('/signup', validateSignup, async (req, res) => {
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
        const user = new User({ name, email, phone, address, password: hashedPassword, created, updated, role })
        await user.save()

        res.status(201).json({ message: 'Đăng ký thành công' })
    } catch(error) {
        console.error(error)
        res.status(500).json({ message: 'Lỗi server' })
    }
})

//Đăng nhập Login
router.post('/login', validateLogin, async (req, res) => {
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

module.exports = router

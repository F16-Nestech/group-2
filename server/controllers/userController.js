const bcrypt = require("bcryptjs");
// const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

//ADD User
exports.registerUser = async (req, res, next) => {
  console.log('create user');
  try {
    let { name, email, phone, password, confirmPassword } = req.body;
    if (!name || !email || !phone || !password || !confirmPassword)
      return res.status(400).json({
        success: false,
        result: null,
        message: "Email , phone, password  fields they don't have been entered.",
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
    const newUser = new User(req.body);

    const result = await newUser.save();
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


  //LOGIN USER
  exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email })
      if (!user) {
        res.status(404).json({ message: 'Wrong Email' })
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        res.status(404).json({ message: 'Wrong password' })
      }
      if (user && validPassword) {
        return res.status(200).json(user);
      }
    } catch (err) {
      res.status(501).json({ success: false, message: 'Error server' });
    }
  }

//GET all User
exports.getUsers = async (req, res) => {
  console.log('get users');
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(501).json(err);
  }
},

  //GET an User
  exports.getUser = async (req, res) => {
    console.log('get a user');
    try {
      //find info user by id
      const user = await User.findOne({
        _id: req.params.id,
      });
      if (!user) {
        return res.status(404).json({
          success: false,
          result: null,
          message: 'No info user found by this id:' + req.params.id,
        });
      } else {
        let result = {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          role: user.role,
        };
        return res.status(200).json({
          success: true,
          result,
          message: 'Found info user by this id:' + req.params.id,
        })
      }
    } catch (err) {
      return res.status(501).json({
        success: false,
        result: null,
        message: 'server error'
      });
    }
  },


  //Update User
  exports.updateUser = async (req, res) => {
    console.log('update user');
    try {

      const result = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true },
      ).exec();

      if (!result) {
        return res.status(404).json({
          success: false,
          result: null,
          message: 'No User information found from this id: ' + req.params.id,
        });
      }
      return res.status(200).json({
        success: true,
        result: {
          _id: result._id,
          name: result.name,
          email: result.email,
          password: result.password,
          phone: result.phone,
          address: result.address,
          role: result.role,
        },
        message: 'updated this User information by this id:' + req.params.id,
      });
    } catch (err) {
      return res.status(501).json({
        success: false,
        result: null,
        message: 'server error',
      })
    }
  }


//Delete User
exports.deleteUser = async (req, res) => {
  try {
    const user = req.params.id;
    const result = await User.deleteOne({ _id: user }); // Delete user on _id
    if (!result) {
      return res.status(404).json({
        success: false,
        result: null,
        message: 'No user found to delete',
      });
    } else {
      return res.status(200).json({
        success: true,
        result,
        message: 'User has been successfully deleted',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      result: null,
      message: 'server err',
    });
  }
};

//Delete many User(id)
exports.deleteManyUsers = async (req, res) => {
  try {
    const ids = req.body
    const result = await User.deleteMany({ _id: ids })
    if (!ids) {
      return res.status(404).json({
        success: false,
        message: 'The ids is required',
      })
    } else {
      return res.status(200).json({
        success: true,
        result,
        message: 'Delete Users successfully!'
      })
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      result: null,
      message: 'server err',
    });
  }

};


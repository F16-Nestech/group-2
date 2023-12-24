const User = require('../models/userModel');

//ADD User
exports.createUser = async (req, res) => {
  console.log('create user');
  try {
    let { email, phone, password } = req.body;
    if (!email || !password)
      return res.status(400).json({
        success: false,
        result: null,
        message: "Email , phone, password  fields they don't have been entered.",
      })

    //check mail chi ton tai duy nhat
    const existingEmailUser = await User.findOne({ email: email });
    if (existingEmailUser) {
      return res.status(400).json({ error: 'email already exists!' })
    }

    //check number phone chi ton tai duy nhat
    const existingPhoneUser = await User.findOne({ phone: phone });
    if (existingPhoneUser) {
      return res.status(400).json({ error: 'Phone Number already exists!' })
    }

    //check long password
    if (password.length < 8)
      return res.status(400).json({
        success: false,
        result: null,
        message: 'Password need to be at least 8 characters long',
      })

    //MA HOA PASSWORD (BO SUNG SAU)

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
        address: result.address,
        access_token: result.access_token,
        refresh_token: result.refresh_token,
        role: result.role,
      },
      message: 'The User is saved correctly',
    })
  } catch (err) {
    res.status(501).json({ success: false, message: 'error server' });
  }
},

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
      const userId = await User.findOne({
        _id: req.params.id,
      });
      if (!userId) {
        return res.status(404).json({
          success: false,
          result: null,
          message: 'No info user found by this id:' + req.params.id,
        });
      } else {
        let result = {
          _id: userId._id,
          name: userId.name,
          email: userId.email,
          phone: userId.phone,
          address: userId.address,
          access_token: userId.access_token,
          refresh_token: userId.refresh_token,
          role: userId.role,
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
          phone: result.phone,
          address: result.address,
          access_token: result.access_token,
          refresh_token: result.refresh_token,
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
    const userId = req.params.id;
    const result = await User.deleteOne({ _id: userId }); // Delete user on _id
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


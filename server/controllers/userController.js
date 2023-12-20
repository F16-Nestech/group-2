
const User = require('../models/userModel');

//ADD User
exports.createUser = async (req, res) => {
  console.log('create user');
  try {
    const newUser = new User(req.body);
    const saveUser = await newUser.save();
    res.status(200).json(saveUser)
  } catch (err) {
    res.status(501).json(err);
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
  exports.getAnUser = async (req, res) => {
    console.log('get a user');
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user)
    } catch (err) {
      res.status(501).json(err);
    }
  },

  //Update User
  exports.updateUser = async (req, res) => {
    console.log('update user');
    try {
      const user = await User.findByIdAndUpdate(req.params.id);
      await user.updateOne({ $set: req.body });
      res.status(200).json('updated user success!')
    } catch (err) {
      res.status(501).json(err);
    }
  }
//Delete User
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted User Successfully!")
  } catch (err) {
    res.status(501).json(err)
  }
}

// module.exports = createUser;

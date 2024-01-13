const User = require('../models/userModel');

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
    console.log("get a user");
    try {
      //find info user by id
      const user = await User.findOne({
        _id: req.params.id,
      });
      if (!user) {
        return res.status(404).json({
          success: false,
          result: null,
          message: "No info user found by this id:" + req.params.id,
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
          message: "Found info user by this id:" + req.params.id,
        });
      }
    } catch (err) {
      return res.status(501).json({
        success: false,
        result: null,
        message: "server error",
      });
    }
  },

  //Update User
   exports.updateUser = async (req, res) => {
    console.log("update user");
    try {
      const result = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      ).exec();

      if (!result) {
        return res.status(404).json({
          success: false,
          result: null,
          message: "No User information found from this id: " + req.params.id,
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
        message: "updated this User information by this id:" + req.params.id,
      });
    } catch (err) {
      return res.status(501).json({
        success: false,
        result: null,
        message: "server error",
      });
    }
  });


//Delete User
exports.deleteUser = async (req, res) => {
  try {
    const user = req.params.id;
    const result = await User.deleteOne({ _id: user }); // Delete user on _id
    if (!result) {
      return res.status(404).json({
        success: false,
        result: null,
        message: "No user found to delete",
      });
    } else {
      return res.status(200).json({
        success: true,
        result,
        message: "User has been successfully deleted",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      result: null,
      message: "server err",
    });
  }
};

//Delete many User(id)
exports.deleteManyUsers = async (req, res) => {
  try {
    const ids = req.body;
    const result = await User.deleteMany({ _id: ids });
    if (!ids) {
      return res.status(404).json({
        success: false,
        message: "The ids is required",
      });
    } else {
      return res.status(200).json({
        success: true,
        result,
        message: "Delete Users successfully!",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      result: null,
      message: "server err",
    });
  }
};

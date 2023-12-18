
const User = require('../models/userModel');
// const UserService = require('../services/UserService');

const createUser = async (req, res) => {
    try {
        console.log(req.body);
        const res = await UserService.createUser();
        return res.status(200).json(res)
    } catch (e) {
        return res.status(404).json({
            message: 'is there error'
        });
    }
}

exports.getUsers = async (req, res) => {
    console.log('get users');

    const quertObj = { ...req.query }

    res.status(200).json({
      status: 'success',
      count: 1
    })
}

exports.createUser = async (req, res) => {
  console.log('create user');

  const doc = new User(req.body);
  await doc.save();

  res.status(201).json({
    status: 'success',
    data: doc
  })
}

// module.exports = createUser;
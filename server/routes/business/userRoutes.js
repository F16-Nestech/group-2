const express = require("express");
const userController = require('../../controllers/userController');

const router = express.Router()

router
  .get('/', userController.getUsers)
  .post('/', userController.createUser);

router
  // .patch('/:id', userController.updateUser)
  // .delete('/:id', userController.deleteUser);

module.exports = router;
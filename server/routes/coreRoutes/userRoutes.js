const express = require("express");
const userController = require('../../controllers/userController');

const router = express.Router()

router
  .post("/", userController.createUser) //Add User
  .get("/", userController.getUsers) //Get all Users
  .get("/:id", userController.getAnUser) //Get a User
  .put("/:id", userController.updateUser)

// .patch('/:id', userController.updateUser)
// .delete('/:id', userController.deleteUser);
module.exports = router;

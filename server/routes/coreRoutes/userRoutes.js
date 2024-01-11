const express = require("express");
const userController = require('../../controllers/userController');

const router = express.Router()

router
  .post("/user/", userController.createUser) //Add User
  .get("/users", userController.getUsers) //Get all Users
  .get("/user/:id", userController.getUser) //get a user
  .put("/user/:id", userController.updateUser) //Update User
  .delete("/user/:id", userController.deleteUser) //delete User
  .delete("/users", userController.deleteManyUsers) // delete many User
module.exports = router;


const express = require("express");
const userController = require('../../controllers/userController');

const router = express.Router()

router
  .post("/create/", userController.createUser) //Add User
  .get("/list", userController.getUsers) //Get all Users
  .get("/read-User/:id", userController.getUser) //get a user
  .put("/update/:id", userController.updateUser) //Update User
  .delete("/delete/:id", userController.deleteUser) //delete User
  .delete("/delete-many", userController.deleteManyUsers) // delete many User
module.exports = router;


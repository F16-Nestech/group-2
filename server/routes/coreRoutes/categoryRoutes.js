const express = require('express');
const categoryController = require('../../controllers/categoryController');

const router = express.Router()

router
    .post("/add", categoryController.addCategory)
    .get("/list", categoryController.getCategories)
    .put("/update/:id", categoryController.updateCategories)
    .delete("/delete/:id", categoryController.deleteCategories)
module.exports = router;


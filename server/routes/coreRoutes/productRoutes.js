const express = require('express');
const productController = require('../../controllers/productController');

const router = express.Router()

//add a product
router.post("/", productController.createProduct);

//Get all Products
router.get("/", productController.getAllProducts);

//Get an Products
router.get("/:id", productController.getAnProduct);

//Update Products
router.put("/:id", productController.updateProduct);

module.exports = router;

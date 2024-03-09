const express = require('express');
const productController = require('../../controllers/productController');

const router = express.Router()

//add a product
router.post("/product", productController.createProduct);

//Get all Products
router.get("/products", productController.getProducts);

//Get an Products
router.get("/product/:id", productController.getProduct);

//Update Products
router.put("/product/:id", productController.updateProduct);

//Delete Product 
router.delete("/product/:id", productController.deleteProduct);

//Delete many Products
router.delete("/products", productController.deleteManyProducts);


module.exports = router;


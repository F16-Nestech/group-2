const express = require('express');
const productController = require('../../controllers/productController');

const router = express.Router()

//add a product
router.post("/product", productController.createProduct);

//Get all Products
router.get("/list", productController.getProducts);

//Get an Products
router.get("/read-Product/:id", productController.getProduct);

//Update Products
router.put("/update/:id", productController.updateProduct);

//Delete Product 
router.delete("/delete/:id", productController.deleteProduct);

//Delete many Products
router.delete("/delete-many", productController.deleteManyProducts);


module.exports = router;

const Product = require('../models/productModel');

const productController = {
    //Add Product
    createProduct: async (req, res) => {
        console.log('create product');
        try {
            const newProduct = new Product(req.body);
            const saveProduct = await newProduct.save();
            res.status(200).json(saveProduct)
        } catch (err) {
            res.status(501).json(err);
        }
    },
    //Get all Products
    getAllProducts: async (req, res) => {
        console.log('get all product');
        try {
            const allProduct = await Product.find();
            res.status(200).json(allProduct);
        } catch (err) {
            res.status(501).json(err);
        }
    },
    //Get an Product
    getAnProduct: async (req, res) => {
        console.log('get a product');
        try {
            const product = await Product.findById(req.params.id);
            res.status(200).json(product)
        } catch (err) {
            res.status(501).json(err);
        }
    },
    //Update Product
    updateProduct: async (req, res) => {
        console.log('update product');
        try {
            const product = await Product.findByIdAndUpdate(req.params.id);
            await product.updateOne({ $set: req.body });
            res.status(200).json('Updated product success!');
        } catch (err) {
            res.status(501).json(err)
        }
    },
    //Delete Product
    deleteProduct: async (req, res) => {
        try {
            await Product.findByIdAndDelete(req.params.id)
            res.status(200).json("Deleted Product Successfully!")
        } catch (err) {
            res.status(501).json(err)
        }
    }
};

module.exports = productController;

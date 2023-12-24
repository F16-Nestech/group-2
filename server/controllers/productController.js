const Product = require('../models/productModel');

const productController = {
    //Add Product
    createProduct: async (req, res) => {

        try {
            let { name, type, price, image_link, countInstock, rating } = req.body;
            if (!name || !type || !price || !image_link || !countInstock || !rating) {
                return res.status(400).json({
                    result: null,
                    success: false,
                    message: 'the input is required.',
                })
            }

            const existingNameProduct = await Product.findOne({ name: name });

            if (existingNameProduct) {
                return res.status(400).json({
                    success: false,
                    result: null,
                    message: 'Product name already exists!',
                });
            }

            const newProduct = new Product(req.body);

            const result = await newProduct.save();
            if (!result) {
                return res.status(403).json({
                    success: false,
                    result: null,
                    message: "product couldn't save correctly",
                });
            }
            return res.status(200).send({
                success: true,
                result: {
                    _id: result._id,
                    name: result.name,
                    type: result.type,
                    price: result.price,
                    image_link: result.image_link,
                    countInstock: result.countInstock,
                    rating: result.rating,
                },
                message: 'The product is saved correctly',
            })
        } catch (err) {
            res.status(501).json({ success: false, message: 'error server' });
        }
    },


    //Get all Products
    getProducts: async (req, res) => {
        console.log('get all product');
        try {
            const allProduct = await Product.find();
            res.status(200).json(allProduct);
        } catch (err) {
            res.status(501).json(err);
        }
    },


    //Get an Product
    getProduct: async (req, res) => {
        console.log('get a product');
        try {
            //find info product by id
            const productId = await Product.findOne({
                _id: req.params.id,
            });
            if (!productId) {
                return res.status(404).json({
                    success: false,
                    result: null,
                    message: 'No info product found by this id:' + req.params.id,
                });
            } else {
                let result = {
                    _id: productId._id,
                    name: productId.name,
                    type: productId.type,
                    price: productId.price,
                    image_link: productId.image_link,
                    countInstock: productId.countInstock,
                    rating: productId.rating,
                };
                return res.status(200).json({
                    success: true,
                    result,
                    message: 'Found info product by this id:' + req.params.id,
                })
            }
        } catch (err) {
            return res.status(501).json({
                success: false,
                result: null,
                message: 'server error'
            });
        }
    },


    //Update Product
    updateProduct: async (req, res) => {
        console.log('update product');
        try {

            const result = await Product.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { new: true },
            ).exec();

            if (!result) {
                return res.status(404).json({
                    success: false,
                    result: null,
                    message: 'No product information found from this id: ' + req.params.id,
                });
            }
            return res.status(200).json({
                success: true,
                result: {
                    _id: result._id,
                    name: result.name,
                    type: result.type,
                    price: result.price,
                    image_link: result.image_link,
                    countInstock: result.countInstock,
                    rating: result.rating,
                },
                message: 'updated this product information by this id:' + req.params.id,
            });
        } catch (err) {
            return res.status(501).json({
                success: false,
                result: null,
                message: 'server error',
            })
        }
    },


    //Delete Product
    deleteProduct: async (req, res) => {
        try {
            const productId = req.params.id; // Lấy productId từ request
            const result = await Product.deleteOne({ _id: productId }); // Xóa sản phẩm dựa trên _id
            if (!result) {
                return res.status(404).json({
                    success: false,
                    result: null,
                    message: 'No products found to delete',
                });
            } else {
                return res.status(200).json({
                    success: true,
                    result,
                    message: 'Product has been successfully deleted',
                });
            }
        } catch (error) {
            return res.status(500).json({
                success: false,
                result: null,
                message: 'server err',
            });
        }
    },

    //Delete Many Product
    deleteManyProducts: async (req, res) => {
        try {
            const ids = req.body
            const result = await Product.deleteMany({ _id: ids })
            if (!ids) {
                return res.status(404).json({
                    success: false,
                    message: 'The ids is required',
                })
            } else {
                return res.status(200).json({
                    success: true,
                    result,
                    message: 'Delete products successfully!'
                })
            }
        } catch (err) {
            return res.status(500).json({
                success: false,
                result: null,
                message: 'server err',
            });
        }
    }
};

module.exports = productController;


const { default: mongoose } = require("mongoose");
const Product = require("../models/productModel");

const productController = {
  //Add Product
  createProduct: async (req, res) => {
    console.log('create a product');
    try {
      const { name, type, price, image_link, countInstock, discount, rating } = req.body;
      if (!name || !type || !price || !image_link || !countInstock || !discount || !rating) {
        return res.status(400).json({
          result: null,
          success: false,
          message: 'the input is required.',
        })
      }

      const existingProduct = await Product.findOne({ name: name });

      if (existingProduct) {
        return res.status(400).json({
          success: false,
          result: null,
          message: "Product name already exists!",
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
        message: "The product is saved correctly",
      });
    } catch (err) {
      res.status(501).json({ success: false, message: "error server" });
    }
  },

  getProducts: async (req, res) => {
    try {
      let filter = {};
      if (req.query.minPrice) {
        filter.price = { $gte: parseInt(req.query.minPrice) };
      }
      if (req.query.maxPrice) {
        if (!filter.price) {
          filter.price = {};
        }
        filter.price.$lte = parseInt(req.query.maxPrice);
      }
      if (req.query.searchTerm) {
        filter.$or = [
          { name: { $regex: req.query.searchTerm, $options: "i" } },
          { description: { $regex: req.query.searchTerm, $options: "i" } },
        ];
      }
      let options = {};
      if (req.query.sortBy && req.query.sortOrder) {
        let sortDirection = req.query.sortOrder === "desc" ? -1 : 1;
        options.sort = { [req.query.sortBy]: sortDirection };
      }
      const page = parseInt(req.query.page) || 1;
      const perPage = parseInt(req.query.perPage) || 15;
      const skip = (page - 1) * perPage;

      const allProduct = await Product.find(filter, null, options)
        .skip(skip)
        .limit(perPage);
      res.status(200).json(allProduct);
    } catch (err) {
      res.status(501).json(err);
    }
  },

  getProduct: async (req, res) => {
    try {
      const productId = await Product.findOne({
        _id: req.params.id,
      });
      if (!productId) {
        return res.status(404).json({
          success: false,
          result: null,
          message: "No info product found by this id:" + req.params.id,
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
          description: productId.Description,
        };
        return res.status(200).json({
          success: true,
          result,
          message: "Found info product by this id:" + req.params.id,
        });
      }
    } catch (err) {
      return res.status(501).json({
        success: false,
        result: null,
        message: "server error",
      });
    }
  },
  updateProduct: async (req, res) => {
    console.log("update product");
    try {
      const result = await Product.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      ).exec();

      if (!result) {
        return res.status(404).json({
          success: false,
          result: null,
          message:
            "No product information found from this id: " + req.params.id,
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
        message: "updated this product information by this id:" + req.params.id,
      });
    } catch (err) {
      return res.status(501).json({
        success: false,
        result: null,
        message: "server error",
      });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      const result = await Product.deleteOne({ _id: productId });
      if (!result) {
        return res.status(404).json({
          success: false,
          result: null,
          message: "No products found to delete",
        });
      } else {
        return res.status(200).json({
          success: true,
          result,
          message: "Product has been successfully deleted",
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        result: null,
        message: "server err",
      });
    }
  },

  deleteManyProducts: async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const ids = req.body;
      if (!ids || Array.isArray(ids) || ids.length === 0) {
        throw new Error("Invalid ids");
      }

      const result = await Product.deleteMany({ _id: { $in: ids } }).session(
        session
      );

      await session.commitTransaction();
      session.endSession();

      return res.status(200).json({
        success: true,
        result,
        message: "Delete products successfully!",
      });
    } catch (err) {
      await session.abortTransaction();
      session.endSession();

      return res.status(500).json({
        success: false,
        result: null,
        message: err.message || "server err",
      });
    }
  },
};

module.exports = productController;

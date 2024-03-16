const { default: mongoose } = require('mongoose');
const OrderItem = require('../models/orderItemsModel');

const getAllItems = async (req, res) => {
    try {
        const items = await OrderItem.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const addToCart = async (req, res) => {
    try {
        const { name, amount, image, price, discount, product } = req.body;
        const newOrderItem = await OrderItem.create({
            name: name,
            image: image,
            price: price,
            discount: discount,
            product: product
        });
        const savedOrder = await newOrderItem.save();

        res.status(201).json(savedOrder); 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const removeFromCart = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedOrderItem = await OrderItem.findByIdAndDelete(id);
        if (!deletedOrderItem) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại trong giỏ hàng' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = {
    addToCart,
    getAllItems,
    removeFromCart
};

const { default: mongoose } = require("mongoose");
const Order = require("../models/orderModel");

const orderController = {
  // Get all Orders
  getOrders: async (req, res) => {
    console.log('get all orders');
        try {
            const allOrders = await Order.find();
            res.status(200).json(allOrders);
        } catch (err) {
            res.status(501).json(err);
        }
  }
}

module.exports = orderController;

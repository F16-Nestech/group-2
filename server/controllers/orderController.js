const { default: mongoose } = require("mongoose");
const Order = require("../models/orderModel");

const orderController = {
  // Get all Orders
  getOrders: async (req, res) => {
    console.log('get all orders');
    try {
      const allOrders = await Order.find();

      const adjustedOrders = allOrders.map(order => {
        const adjustedOrder = {
          _id: order._id,
          customer: order.customer,
          // fullName: order.shippingAddress.fullName,
          address: order.shippingAddress.address,
          city: order.shippingAddress.city,
          phone: order.shippingAddress.phone,
          // name: order.orderItems[0].name,
          // amount: order.orderItems[0].amount,
          // price: order.orderItems[0].price,
          // image: order.orderItems[0].image,
          status: order.status
        };
        return adjustedOrder;
      });

      res.status(200).json(adjustedOrders);
    } catch (err) {
      res.status(501).json(err);
    }
  },

  // Add an order
  addOrder: async(req, res) => {
    console.log('add an order');
    try {
      const { orderItems, shippingAddress } = req.body;
      if (!orderItems || !shippingAddress) {
        return res.status(400).json({ message: 'Missing required fields.' });
      }

      const newOrder = new Order({
        orderItems,
        shippingAddress,
      });

      const savedOrder = await newOrder.save();

      res.status(200).json(savedOrder);
    } catch (err) {
      res.status(501).json(err);
    }
  },

  // Get an order
  searchAnOrder: async (req, res) => {
    console.log('get an order');
    try {
      // Lấy ID từ request params
      const orderId = req.params.id;

      // Kiểm tra xem ID có hợp lệ không
      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({ message: 'Invalid Order Id.' });
      }
      // Tìm đơn hàng trong cơ sở dữ liệu dựa trên ID
      const order = await Order.findById(orderId);
      // Kiểm tra xem đơn hàng có tồn tại không
      if (!order) {
        return res.status(404).json({ message: 'Order is not found.' });
      }
      // Trả về thông tin đơn hàng
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Update order
  updateOrder: async (req, res) => {
    try {
      const orderId = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({ message: 'Invalid Order Id.' });
      }
      
      const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, { new: true });

      if (!updatedOrder) {
        return res.status(404).json({ message: 'Order is not found.' });
      }

      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Delete Order
  deleteOrder: async (req, res) => {
    try {
      const orderId = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({ message: 'Invalid Order Id.' });
      }

      const deletedOrder = await Order.findByIdAndDelete(orderId);

      if (!deletedOrder) {
        return res.status(404).json({ message: 'Order is not found.' });
      }

      res.status(200).json(deletedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Delete many orders
  deleteManyOrder: async (req, res) => {
    try {
      const conditions = req.body.conditions;
      if (!conditions) {
        return res.status(400).json({ message: 'Missing condition for delete.' });
      }

      const deletedOrders = await Order.deleteMany(conditions);

      if (deletedOrders.deletedCount == 0) {
        return res.status(404).json({ message: 'No matching order found.' });
      }

      res.status(200).json({
        deletedCount: deletedOrders.deletedCount,
        message: 'Orders successfully deleted.'
      });
    } catch (err) {
      console.error(err)
      res.status(500).json(err);
    }
  }

}

module.exports = orderController;

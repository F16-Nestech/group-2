const express = require('express');
const orderController = require("../../controllers/orderController");


const router = express.Router();

// add an order
router.post("/create", orderController.addOrder);

// get all orders
router.get("/list", orderController.getOrders);

// get an order
router.get("/read-order/:id", orderController.searchAnOrder);

// update order
router.put("/update/:id", orderController.updateOrder);

// delete order
router.delete("/delete/:id", orderController.deleteOrder);

// delete many order
router.delete("/delete-many", orderController.deleteManyOrder);

module.exports = router;

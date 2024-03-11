const express = require('express');
const orderController = require("../../controllers/orderController");


const router = express.Router();

// add a order
// router.post("/create");

// get all orders
router.get("/list", orderController.getOrders);

// get an order
// router.get("/read-order/:id");

// update order
// router.put("/update/:id");

// delete order
// router.delete("/delete/:id");

// delete many order
// router.delete("/delete-many");

module.exports = router;

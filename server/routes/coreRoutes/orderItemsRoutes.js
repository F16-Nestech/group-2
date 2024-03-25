const express = require('express');
const orderItemsController = require("../../controllers/orderItemsController");

const router = express.Router();

router.post("/add", orderItemsController.addToCart);
router.get("/items", orderItemsController.getAllItems);
router.delete("/delete/:id", orderItemsController.removeFromCart);
module.exports = router;

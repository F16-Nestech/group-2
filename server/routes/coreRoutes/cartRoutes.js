const express = require('express');
const cartController = require("../../controllers/cartController");

const router = express.Router();

router.post("/add", cartController.addToCart);
router.get("/items", cartController.getAllItems);
router.delete("/delete/:id", cartController.removeFromCart);
module.exports = router;

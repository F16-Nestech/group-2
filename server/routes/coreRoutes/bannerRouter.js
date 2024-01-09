const express = require('express');
const bannerController = require('../../controllers/bannerController');

const router = express.Router()

//add a Banner
router.post("/createBanner", bannerController.createBanner);

//Get all Banner
router.get("/listBanner", bannerController.getBanner);

//Update Banner
router.put("/updateBanner/:id", bannerController.updateBanner);

//Delete Banner 
router.delete("/deleteBanner/:id", bannerController.deleteBanner);

//Delete many Banner
router.delete("/deleteManyBanner", bannerController.deleteManyBanner);

module.exports = router;
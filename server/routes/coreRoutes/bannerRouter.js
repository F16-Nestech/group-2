const express = require("express");
const bannerController = require("../../controllers/bannerController");

const router = express.Router();

//add a Banner
router.post("/banner", bannerController.createBanner);

//Get all Banner
router.get("/banners", bannerController.getBanner);

//Update Banner
router.put("/banner/:id", bannerController.updateBanner);

//Delete Banner
router.delete("/banner/:id", bannerController.deleteBanner);

//Delete many Banner
router.delete("/banners", bannerController.deleteManyBanner);

module.exports = router;

const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  deleted: {
    type: Boolean,
    default: false,
  },
});

const Banner = mongoose.model("Banner", bannerSchema);
module.exports = Banner;

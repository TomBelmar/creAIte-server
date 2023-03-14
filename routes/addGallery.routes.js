const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Image = require("../models/Image.model");

router.put("/gallery", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload;
  const {selected} = req.body;
  try {
    const imgGallery = await User.findByIdAndUpdate(
      _id,
      {
        $push: { gallery: {$each: selected} }
      },
      { new: true }
    );
    console.log(imgGallery);
    res.json(imgGallery);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;

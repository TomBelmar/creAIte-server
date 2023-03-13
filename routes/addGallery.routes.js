const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.put("/gallery", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload;
  const { images } = req.body;
  try {
    console.log(images)
    const imgGallery = await User.findByIdAndUpdate(_id, {
      $push: { gallery: images },
    });

    res.json( {imgGallery} );
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;

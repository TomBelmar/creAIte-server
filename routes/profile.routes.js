const express = require("express");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const router = express.Router();
const Image = require('../models/Image.model')

const User = require("../models/User.model");


router.get("/profile", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload;

  try {
    const profile = await User.findById(_id).populate("gallery");
    res.json(profile);
    
  } catch (error) {
    res.json(error);
  }
});

router.delete("/gallery/:imgId", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload;
  const {imgId} = req.params

  try {
    const profile = await User.findByIdAndUpdate(_id, {$pull: {gallery: imgId}})
    await Image.findByIdAndRemove(imgId)
    res.json(profile);
    
  } catch (error) {
    res.json(error);
  }
});
router.put("/gallery/avatar/:imgId", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload;
  const {imgId} = req.params

  try {
    const image = await Image.findById(imgId)
    const imageURL = image.imageURL
    const editAvatar = await User.findByIdAndUpdate(_id, {profileImage:imageURL}, {new: true}
    );
    
    res.json(editAvatar)
  } catch (error) {
    res.json(error);
  }
});


module.exports = router;

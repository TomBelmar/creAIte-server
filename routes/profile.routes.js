const express = require("express");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const router = express.Router();

const User = require("../models/User.model");

router.get("/profile/:id", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload;

  try {
    const profile = await User.findById(_id).populate("gallery");
    res.json(profile);
    console.log(profile)
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;

const express = require("express");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const router = express.Router();

const User = require("../models/User.model");


router.put("/profile/", isAuthenticated, async (req, res, next)=>{
  const { _id } = req.payload;
const {email, firstName, lastName, aboutMe} = req.body
    try {
        const updatedProfile = await User.findByIdAndUpdate(_id, {email, firstName, lastName, aboutMe})
        res.json(updatedProfile)
    } catch (error) {
        res.json(error)
    }


// Delete by ID
router.delete("/profile/", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload;
  
    try {
      const deletedUser = await User.findByIdAndDelete(_id);
      res.json(deletedUser);
    } catch (error) {
      res.json(error);
    }
  });

});

module.exports = router;

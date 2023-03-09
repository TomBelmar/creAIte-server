const express = require("express");
const router = express.Router();

const User = require("../models/User.model");


router.put("/profile/:id", async (req, res, next)=>{
    const {id} = req.params
const {email, firstName, lastName, aboutMe} = req.body
    try {
        const updatedProfile = await User.findByIdAndUpdate(id, {email, firstName, lastName, aboutMe})
        res.json(updatedProfile)
    } catch (error) {
        res.json(error)
    }

});

module.exports = router;

const express = require("express");
const router = express.Router();

const User = require("../models/User.model");


router.get("/profile/:id", async (req, res, next)=>{
    const {id} = req.params

    try {
        const profile = await User.findById(id).populate();
        res.json(profile);
        
        
    } catch (error) {
       res.json(error); 
    }
})



module.exports = router;


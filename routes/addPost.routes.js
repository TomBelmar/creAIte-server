const express = require("express");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const router = express.Router();

const Post = require('../models/Post.model')
//create post
router.post("/post/create", isAuthenticated, async (req, res, next) =>{

    const { _id } = req.payload;
    const {imageURL, description} = req.body
console.log(req.body)

    try {
        
        const post = await Post.create({imageURL, description, creator: _id});

        res.json(post);
    } catch (error) {
        res.json(error)
    }
});


module.exports = router;
const express = require("express");
const router = express.Router();

const Post = require('../models/Post.model')

router.post("/post/create/:id", async (req, res, next) =>{

    const {id} = req.params
    const {imageURL, description} = req.body


    try {
        
        const post = await Post.create({imageURL, description, creator: id});

        res.json(post);
    } catch (error) {
        res.json(error)
    }




})

module.exports = router;
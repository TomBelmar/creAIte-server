const express = require("express");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const router = express.Router();

const Post = require('../models/Post.model')
//create post
router.post("/post/create/", isAuthenticated, async (req, res, next) =>{

    const { _id } = req.payload;
    const {imageURL, description} = req.body


    try {
        
        const post = await Post.create({imageURL, description, creator: _id});

        res.json(post);
    } catch (error) {
        res.json(error)
    }
});

// Edit post
router.put("/post/edit/", isAuthenticated, async (req, res) => {
    const { _id } = req.payload;
  
    try {
      // Find by ID and update the request
      const post = await Post.findByIdAndUpdate(_id, req.body, {
        newPost: true, 
        updateSchema: true, 
      });
  
      res.json(post); // new post update
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }


});

module.exports = router;
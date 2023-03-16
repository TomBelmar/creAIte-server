const express = require("express");
const router = express.Router();
const Post = require("../models/Post.model")
const { isAuthenticated } = require("../middleware/jwt.middleware");
const User = require("../models/User.model")

router.put("/likes/:postId", isAuthenticated, async (req, res, next) => {
    const { postId } = req.params;
    

    try {
      const searchedPost = await Post.findById(postId)
      if(searchedPost.likes.includes(req.payload._id)){
        const postLikes = await Post.findByIdAndUpdate(postId, {
          $pull: { likes: req.payload._id },
        }, {new: true});
        
      }else{

        const postLikes = await Post.findByIdAndUpdate(postId, {
          $push: { likes: req.payload._id },
        }, {new: true});
        
      }
  
      res.json( postLikes );
    } catch (error) {
      res.json(error);
    }
  });
  
  module.exports = router;
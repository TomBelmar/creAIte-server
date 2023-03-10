const express = require("express");
const router = express.Router();
const Post = require("../models/Post.model")
const { isAuthenticated } = require("../middleware/jwt.middleware");
const User = require("../models/User.model")

router.put("/:postId/likes", isAuthenticated, async (req, res, next) => {
    const { postId } = req.params;
    

    try {
        
      const postLikes = await Post.findByIdAndUpdate(postId, {
        $push: { likes: req.payload._id },
      }, {new: true});
      console.log(postLikes)
  
      res.json( postLikes );
    } catch (error) {
      res.json(error);
    }
  });
  
  module.exports = router;
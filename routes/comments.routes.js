const router = require('express').Router()

//import the models
const Comment = require('../models/Comment.model')
const Post = require('../models/Post.model')


//Create comment

router.post("/feed/:postId/comment", async(req, res, next)=>{
    const {postId} = req.params
    const {creator, message} = req.body

    try {
        
        const comment = await Comment.create({creator, message});

        const newPost = await Post.findByIdAndUpdate(postId, {$push: {comment: comment._id}}, {new: true})
        console.log(newPost)
        res.json(newPost)

    } catch (error) {
        res.json(error)
    }
})




module.exports = router;
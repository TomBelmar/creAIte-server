const router = require('express').Router()

//import the models
const Comment = require('../models/Comment.model')
const Post = require('../models/Post.model')


//Create comment

router.post("/feed/post/comment", async(req, res, next)=>{
    const {creator, message} = req.body

    try {
        
        const comment = await Comment.create({creator, message});

        await Post.findByIdAndUpdate(comment, {$push: {comment: comment._id}})

        res.json(comment)

    } catch (error) {
        res.json(error)
    }
})




module.exports = router;
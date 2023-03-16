const express = require("express");
const router = express.Router();


const Post = require ("../models/Post.model")


router.get('/feed', async (req, res, next) => {

// deixamos em aberto o populate porque queremos a info toda do Model.
    try {
      const feed = await Post.find().populate('comment').populate('creator');
      res.json(feed);
    } catch (error) {
      res.json(error);
    }
  });

module.exports = router;
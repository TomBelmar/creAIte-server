const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const User = require("../models/User.model");
const axios = require("axios");
const { Configuration, OpenAIApi } = require("openai");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Image = require("../models/Image.model");

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

process.env.CLOUDINARY_SECURE = true;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  
});


router.post("/generator", isAuthenticated, async (req, res, next) => {
  const { search } = req.body;
  const { _id } = req.payload;

  try {
    const response = await openai.createImage({
      prompt: search,
      n: 2,
      size: "256x256",
    });

    const result = await cloudinary.uploader.upload(response.data.data[0].url, {secure: true});
    const result1 = await cloudinary.uploader.upload(response.data.data[1].url, {secure: true});

    const createdImg = await Image.create({ imageURL: result.url });
    const createdImg1 = await Image.create({ imageURL: result1.url });
   
    /*  const userUpdated = await User.findByIdAndUpdate(_id, {
      $push: { gallery: updatedImg },
    }); */

    /* const updatedImgModel = await Image.findByIdAndUpdate(updatedImg._id, {
      $push: { user: userUpdated._id },
    }); */

    

    res.json([createdImg, createdImg1]);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;

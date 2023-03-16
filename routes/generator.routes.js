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


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});


router.post("/generator", isAuthenticated, async (req, res, next) => {
  const { search } = req.body;
  const { _id } = req.payload;

  try {
    const response = await openai.createImage({
      prompt: search,
      n: 4,
      size: "256x256",
    });

    const result = await cloudinary.uploader.upload(response.data.data[0].url, {secure: true});
    const resultUrl = cloudinary.url(result.public_id, {secure: true});
    const result1 = await cloudinary.uploader.upload(response.data.data[1].url, {secure: true});
    const resultUrl1 = cloudinary.url(result1.public_id, {secure: true});
    const result2 = await cloudinary.uploader.upload(response.data.data[2].url, {secure: true});
    const resultUrl2 = cloudinary.url(result2.public_id, {secure: true});
    const result3 = await cloudinary.uploader.upload(response.data.data[3].url, {secure: true});
    const resultUrl3 = cloudinary.url(result3.public_id, {secure: true});

    const createdImg = await Image.create({ imageURL: resultUrl });
    const createdImg1 = await Image.create({ imageURL: resultUrl1 });
    const createdImg2 = await Image.create({ imageURL: resultUrl2 });
    const createdImg3 = await Image.create({ imageURL: resultUrl3 });
   
    /*  const userUpdated = await User.findByIdAndUpdate(_id, {
      $push: { gallery: updatedImg },
    }); */

    /* const updatedImgModel = await Image.findByIdAndUpdate(updatedImg._id, {
      $push: { user: userUpdated._id },
    }); */

    

    res.json([createdImg, createdImg1, createdImg2, createdImg3]);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;

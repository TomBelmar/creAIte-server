const express = require("express");
const router = express.Router();
const cloudinary = require('cloudinary').v2
const User = require("../models/User.model");
const axios = require("axios");
const { Configuration, OpenAIApi } = require("openai");
const {isAuthenticated} = require("../middleware/jwt.middleware")


  
  const configuration = new Configuration({
    apiKey:process.env.API_KEY,
  
  });
  
  const openai = new OpenAIApi(configuration);


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});




router.post('/generator', isAuthenticated, async(req, res, next) =>{

const { search } = req.body

    try {
        
        const response = await openai.createImage({
            prompt: search,
            n: 1,
            size: "256x256",
           })

           const result = await cloudinary.uploader.upload(response.data.data[0].url)





       

        res.json(result.url)
    } catch (error) {
        res.json(error);
    }

})




module.exports = router
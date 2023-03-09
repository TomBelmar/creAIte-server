const express = require("express");
const router = express.Router();
const cloudinary = require('cloudinary').v2



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

router.get("/", (req, res, next) => {
  res.json("All good in here");
});
router.get("/test", (req, res, next) => {
  cloudinary.uploader
.upload("https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png")
.then(result=>{
  console.log(result)
  res.json(result);
});
});

module.exports = router;

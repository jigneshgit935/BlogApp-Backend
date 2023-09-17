const express = require('express');
const router = express.Router();
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const sharp = require('sharp');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/uploadimage', upload.single('myimage'), async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ ok: false, error: 'No image file upload' });
  }

  sharp(file.buffer)
    .resize({ width: 800 })
    .toBuffer(async (err, data, info) => {
      if (err) {
        console.log('Image processing error:', err);
        return res
          .status(500)
          .json({ ok: false, error: 'Error processing image' });
      }
      cloudinary.uploader
        .upload_stream({ resource_type: 'auto' }, async (error, result) => {
          if (error) {
            console.error('Cloudinary Upload Error', error);
            return res.status(500).json({
              ok: false,
              error: 'Error image uploading image to cloudinary',
            });
          }
          res.json({
            ok: true,
            imageUrl: result.url,
            message: 'image uploaded successfully',
          });
        })
        .end(data);
    });
  //   we use buffer to convert file into bits format
});

module.exports = router;

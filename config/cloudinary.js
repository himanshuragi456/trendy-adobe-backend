const { config, uploader } = require('cloudinary').v2;
const multer = require('multer');

// CLoudinary config
const cloudinaryConfig = (req, res, next) => {
  config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });
  next();
};

// Multer config
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/images/');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const multerUploads = multer({ storage }).array('images');
// single's argument (here is 'images') must be the same with the name attribute value on client's html tag

module.exports = {
  cloudinaryConfig,
  uploader,
  multerUploads,
};

const config = require('config');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
  accessKeyId: config.get('accessKeyId'),
  secretAccessKey: config.get('secretAccessKey'),
  region: config.get('region')
});

const s3 = new aws.S3({});

const checkFileType = (req, file, cb) => {
  // Allowed extensions
  const fileTypes = /jpeg|jpg|png/;

  // Check mimetype
  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype) {
    return cb(null, true);
  } else {
    // cb(null, false, new Error('Error: Images only'));
    req.fileValidationError = 'Image files only';
    return cb(null, false, new Error('Image files only'));
  }
};

const uploadAvatar = multer({
  fileFilter: (req, file, cb) => {
    checkFileType(req, file, cb);
  },
  storage: multerS3({
    s3,
    // Save to this bucket
    bucket: 'digi-gallery/avatar',
    // Automatically find content-type of file
    contentType: multerS3.AUTO_CONTENT_TYPE,
    // Grants public read access
    acl: 'public-read',
    metadata: (req, file, cb) => {
      // Need to call cb. First parameter is an error
      cb(null, {
        mimetype: file.mimetype,
        originalName: file.originalname,
        date: Date.now().toString()
      });
    },
    // key is what we are naming the file
    key: (req, file, cb) => {
      cb(null, req.user.id);
    }
  })
}).single('avatar');

module.exports = uploadAvatar;

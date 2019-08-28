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

const uploadAvatar = multer({
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
        originalName: file.originalname
      });
    },
    // key is name of the file
    key: req.user.id
  })
});

module.exports = uploadAvatar;

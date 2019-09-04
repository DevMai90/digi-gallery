const config = require('config');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const uuidv4 = require('uuid/v4');

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

  // To reject, pass false. To accept, pass true
  // console.log(req);
  if (mimetype) return cb(null, true);
  else return cb(new Error('Image files only'), false);
};

const uploadAvatar = multer({
  fileFilter: (req, file, cb) => {
    checkFileType(req, file, cb);
  },
  limits: {
    fileSize: 1000000
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

const deleteAvatar = Key => {
  const avatar = {
    Bucket: 'digi-gallery/avatar',
    Key
  };

  s3.deleteObject(avatar, (err, data) => {
    if (err) throw new Error(err);

    // @todo Add validation?
    console.log('Avatar deleted');
  });
};

const uploadImage = multer({
  fileFilter: (req, file, cb) => {
    checkFileType(req, file, cb);
  },
  limits: {
    fileSize: 5000000
  },
  storage: multerS3({
    s3,
    // Create custom folder with user id
    bucket: (req, file, cb) => {
      cb(null, `digi-gallery/images/${req.user.id}`);
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, {
        mimetype: file.mimetype,
        originalName: file.originalname,
        date: Date.now().toString()
      });
    },
    key: (req, file, cb) => {
      cb(null, `${Date.now()}-${uuidv4()}`);
    }
  })
}).single('image');

module.exports = {
  uploadAvatar,
  deleteAvatar,
  uploadImage
};

const config = require('config');
const aws = require('aws-sdk');

aws.config.update({
  accessKeyId: config.get('accessKeyId'),
  secretAccessKey: config.get('secretAccessKey'),
  region: config.get('region')
});

const s3 = new aws.S3({});

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

module.exports = deleteAvatar;

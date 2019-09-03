const express = require('express');
// Breaks up our routes into separate files. Routes can then be loaded into server.js
const router = express.Router();
const auth = require('../../middleware/auth');
const multerS3 = require('../../middleware/multerS3');

const User = require('../../models/User');
const Post = require('../../models/Post');

// @route   POST /api/posts/
// @desc    Create new post
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.user.id }).select('-password');

    const { firstName, lastName, handle, avatar } = user;

    // Multer Image
    await multerS3.uploadImage(req, res, err => {
      if (err) {
        return res.status(422).send({ errors: [{ msg: err.message }] });
      }

      const { title, category, postText } = req.body;
      const { location } = req.file;

      const newPost = new Post({
        user: req.user.id,
        title,
        category,
        postText,
        firstName,
        lastName,
        handle,
        avatar,
        image: location
      });

      newPost.save();

      res.send(newPost);
      console.log(req.file);
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Sever Error');
  }
});

module.exports = router;

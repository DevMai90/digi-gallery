const express = require('express');
// Breaks up our routes into separate files. Routes can then be loaded into server.js
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const multerS3 = require('../../middleware/multerS3');

const User = require('../../models/User');
const Post = require('../../models/Post');

// @route   POST /api/posts/
// @desc    Create new post
// @access  Private
router.post(
  '/',
  [
    auth,
    // Note: Must use multer with multipart/form-data or else req.body will not be accessible. Multer ONLY handles multipart/form-data
    // Multer adds a body object and files/files to the request object.
    // Body contains text field values from form.
    // File/files contains files uploaded from form.
    // Remember enctype="multipart/form-data" on client side.
    multerS3.uploadImage,
    check('postText', 'Please enter your post text.')
      .not()
      .isEmpty(),
    check('title', 'Please enter a title for your post.')
      .not()
      .isEmpty(),
    check('category', 'Please enter a category for your post.')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { title, category, postText } = req.body;
    const { location } = req.file;

    try {
      let user = await User.findOne({ _id: req.user.id }).select('-password');

      const { firstName, lastName, handle, avatar } = user;

      const newPost = await new Post({
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

      await newPost.save();

      res.send(newPost);

      // await multerS3.uploadImage(req, res, err => {
      //   if (err) {
      //     return res.status(422).send({ errors: [{ msg: err.message }] });
      //   }

      //   const { title, category, postText } = req.body;
      //   const { location } = req.file;

      //   const newPost = new Post({
      //     user: req.user.id,
      //     title,
      //     category,
      //     postText,
      //     firstName,
      //     lastName,
      //     handle,
      //     avatar,
      //     image: location
      //   });

      //   newPost.save();

      //   res.send(newPost);
      // });
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Sever Error');
    }
  }
);

// @route   GET /api/posts
// @desc    Get all posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    let posts = await Post.find().sort({ date: -1 });

    res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/posts/user/:userid
// @desc    Get all posts by user id
// @acccess Public
router.get('/user/:userid', async (req, res) => {
  try {
    // req.params contains route parameters in the path portion of the URL.
    // The : makes it accessible with req.params
    let posts = await Post.find({ user: req.params.userid });

    res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/posts/:postid
// @desc    Get single post by id
// @access  Public
router.get('/:postid', async (req, res) => {
  try {
    let post = await Post.findById(req.params.postid);

    if (!post)
      return res
        .status(404)
        .json({ errors: [{ msg: 'Unable to locate post' }] });

    res.json(post);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/posts/:postid
// @desc    Delete single post by id
// @access  Private
router.delete('/:postid', auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.postid);

    // Check if post is found
    // Must also check if postid is formatted as a valid mongoose ObjectId
    // Mongoose's findById method casts postid parameter to the object model's id. Will cause a cast error if postid is not properly formatted as an ObjectId
    if (!req.params.postid.match(/^[0-9a-fA-F]{24}$/) || !post)
      return res
        .status(404)
        .json({ errors: [{ msg: 'Unable to locate post' }] });

    // Check if user is the same as the post author
    // Must toString because _id (in this case _id from User model) on Mongoose has the type of Object. id (no _) would return a string
    if (req.user.id !== post.user.toString()) {
      return res.status(401).json({ errors: [{ msg: 'Unauthorized access' }] });
    }

    await post.remove();
    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.log(err.message);
    res.send('Server Error');
  }
});

// Comments

// Likes

module.exports = router;

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
    let posts = await Post.find({}).sort({ date: -1 });

    res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/posts/category/:category
// @desc    Get posts by category
// @access  Public
router.get('/category/:category', async (req, res) => {
  try {
    console.log(req.params.category);
    let posts = await Post.find({ category: req.params.category }).sort({
      date: -1
    });

    console.log(posts);
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
    let posts = await Post.find({ user: req.params.userid }).sort({ date: -1 });

    res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/posts/post/:postid
// @desc    Get single post by id
// @access  Public
router.get('/post/:postid', async (req, res) => {
  try {
    // let post = await Post.findById(req.params.postid);
    let post = await Post.findOneAndUpdate(
      { _id: req.params.postid },
      { $inc: { views: 1 } },
      // Must include new or else mongoose sends the document PRIOR to being updated
      { new: true }
    );

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

// @route   PUT /api/posts/edit/:postid
// @desc    Edit single post
// @access  Private
router.put('/edit/:postid', auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.postid);

    // Check for post or ObjectId format
    if (!req.params.postid.match(/^[0-9a-fA-F]{24}$/) || !post)
      return res
        .status(404)
        .json({ errors: [{ msg: 'Unable to locate post' }] });

    if (req.user.id !== post.user.toString()) {
      return res.status(401).json({ errors: [{ msg: 'Unauthorized access' }] });
    }

    const { title, postText, category } = req.body;

    if (title) post.title = title;
    if (postText) post.postText = postText;
    if (category) post.category = category;

    post.edited = new Date();

    await post.save();

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

// @route   PUT /api/posts/like/:postid
// @desc    Like a post
// @access  Private
router.put('/like/:postid', auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.postid);

    if (!req.params.postid.match(/^[0-9a-fA-F]{24}$/) || !post)
      return res
        .status(404)
        .json({ errors: [{ msg: 'Unable to locate post' }] });

    // Check if user already liked post
    // Empty arrays are truthy so we need to check array LENGTH
    // like.user is an ObjectId, not string
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(422).json({ errors: [{ msg: 'Already liked post' }] });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/posts/unlike/:postid
// @desc    Unlike a post
// @access  Private
router.put('/unlike/:postid', auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.postid);

    // Check ObjectId format and if post exists
    if (!req.params.postid.match(/^[0-9a-fA-F]{24}$/) || !post)
      return res
        .status(404)
        .json({ errors: [{ msg: 'Unable to locate post' }] });

    // Find post to remove
    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    if (removeIndex > -1) {
      post.likes.splice(removeIndex, 1);
    } else {
      return res
        .status(404)
        .json({ errors: [{ msg: 'Post has not been liked yet' }] });
    }

    await post.save();

    res.json(post);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/posts/comment/:postid
// @desc    Add a comment
// @access  Private
router.post(
  '/comment/:postid',
  [
    auth,
    check('text', 'Please enter your comment')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    try {
      let post = await Post.findById(req.params.postid);
      let user = await User.findById(req.user.id);

      // Check ObjectId format and if post exists
      if (!req.params.postid.match(/^[0-9a-fA-F]{24}$/) || !post)
        return res
          .status(404)
          .json({ errors: [{ msg: 'Unable to locate post' }] });

      const { firstName, lastName, handle } = user;

      post.comments.unshift({
        user: req.user.id,
        text: req.body.text,
        firstName,
        lastName,
        handle
      });

      await post.save();

      res.json(post);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT /api/posts/comment/:postid/:commentid
// @desc    Edit a comment
// @access  Private
router.put(
  '/comment/:postid/:commentid',
  [
    auth,
    check('text', 'Please enter your comment')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      let post = await Post.findById(req.params.postid);

      // Check for post
      if (!req.params.postid.match(/^[0-9a-fA-F]{24}$/) || !post)
        return res
          .status(404)
          .json({ errors: [{ msg: 'Unable to locate post' }] });

      // Find comment to update
      const updateIndex = post.comments
        .map(comment => comment._id.toString())
        .indexOf(req.params.commentid);

      // Check if comment is found
      if (!req.params.commentid.match(/^[0-9a-fA-F]{24}$/) || updateIndex < 0)
        return res
          .status(404)
          .json({ errors: [{ msg: 'Unable to locate comment' }] });

      // Check if user is same as comment poster
      if (post.comments[updateIndex].user.toString() !== req.user.id) {
        return res.status(401).json({ errors: [{ msg: 'Not authorized' }] });
      }

      // Update text
      post.comments[updateIndex].text = req.body.text;
      post.comments[updateIndex].edited = new Date();

      post.save();

      res.json(post);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE /api/posts/comment/:postid/:commentid
// @desc    Delete a comment
// @access  Private
router.delete('/comment/:postid/:commentid', auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.postid);

    // Check for post
    if (!req.params.postid.match(/^[0-9a-fA-F]{24}$/) || !post)
      return res
        .status(404)
        .json({ errors: [{ msg: 'Unable to locate post' }] });

    // Find comment index to delete
    const deleteIndex = post.comments
      .map(comment => comment._id.toString())
      .indexOf(req.params.commentid);

    // Check comment parameter
    if (!req.params.commentid.match(/^[0-9a-fA-F]{24}$/) || deleteIndex < 0)
      return res
        .status(404)
        .json({ errors: [{ msg: 'Unable to locate comment' }] });

    // Check if user is authorized
    if (post.comments[deleteIndex].user.toString() !== req.user.id) {
      return res.status(401).json({ errors: [{ msg: 'Not authorized' }] });
    }

    // Delete comment
    post.comments.splice(deleteIndex, 1);

    // Update database
    post.save();

    // Return response
    res.json(post);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/posts/homepage
// @desc    Get initial 15 posts then add 6 posts.
// @access  Public
router.get('/homepage', async (req, res) => {
  try {
    // Query - Return posts in descending order
    // Sort descending
    let posts = await Post.find()
      .sort({ date: -1 })
      .select('-postText')
      .limit(parseInt(15));
    // .skip(parseInt(skip));

    res.send(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

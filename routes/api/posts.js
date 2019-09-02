const express = require('express');
// Breaks up our routes into separate files. Routes can then be loaded into server.js
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Post = require('../../models/Post');

// @route   POST /api/posts/
// @desc    Create new post
// @access  Private
router.get('/', (req, res) => {
  res.send('Test Posts');
});

module.exports = router;

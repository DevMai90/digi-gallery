const express = require('express');
// Breaks up our routes into separate files. Routes can then be loaded into server.js
const router = express.Router();

// @route   GET /api/posts/
// @desc    Test route
// @access  Public
router.get('/', (req, res) => {
  res.send('Test Posts');
});

module.exports = router;

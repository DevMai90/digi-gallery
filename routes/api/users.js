const express = require('express');
// Breaks up our routes into separate files. Routes can then be loaded into server.js
const router = express.Router();

// @route   GET /api/users/
// @desc    Test route
// @access  Public
router.get('/', (req, res) => {
  res.send('Test Users');
});

module.exports = router;

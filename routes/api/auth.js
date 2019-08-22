const express = require('express');
// Breaks up our routes into separate files. Routes can then be loaded into server.js
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/User');

// @route   GET /api/auth/
// @desc    Test route
// @access  Private

// This route is now protected because we added the auth middleware
router.get('/', auth, async (req, res) => {
  try {
    // Mongoose methods return a promise. Must resolve
    const user = await User.findById(req.user.id).select('-password');

    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

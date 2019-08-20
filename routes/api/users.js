const express = require('express');

// Breaks up our routes into separate files. Routes can then be loaded into server.js
const router = express.Router();

// Bring in express-validator to validate input and report any errors before completing request and sending a response
const { check, validationResult } = require('express-validator');

// Load User model
const User = require('../../models/User');

// @route   POST /api/users/
// @desc    Register user
// @access  Public
router.post(
  '/',
  [
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    console.log(req.body);
    res.send('User route');
  }
);

module.exports = router;

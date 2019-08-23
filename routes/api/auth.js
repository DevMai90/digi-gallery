const express = require('express');
// Breaks up our routes into separate files. Routes can then be loaded into server.js
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const validateEmailFormat = require('../../utils/validateEmailFormat');

const User = require('../../models/User');

// @route   GET /api/auth/
// @desc    Retrieve user profile
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

// @route   POST /api/auth
// @desc    Authenticate and retrieve token
// @access  Public
// Login via email or user handle
router.post(
  '/',
  [
    check('login', 'Please enter a registered email address or username')
      .not()
      .isEmpty(),
    check('password', 'Please enter a valid password')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    }

    const { login, password } = req.body;

    try {
      let user;
      if (validateEmailFormat(login)) {
        user = await User.findOne({ email: login });
      } else {
        user = await User.findOne({ handle: login });
      }

      console.log(login);
      console.log(validateEmailFormat(login));
      res.send(user);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;

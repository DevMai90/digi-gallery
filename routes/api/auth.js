const express = require('express');
// Breaks up our routes into separate files. Routes can then be loaded into server.js
const router = express.Router();
const config = require('config');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
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

      // Check if email or handle
      if (validateEmailFormat(login)) {
        user = await User.findOne({ email: login });
      } else {
        user = await User.findOne({ handle: login });
      }

      if (!user) {
        return res.status(400).json({
          errors: [{ msg: 'Invalid login credentials.' }]
        });
      }

      // Validate plain text password input with encrypted (hashed) password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          errors: [{ msg: 'Invalid login credentials.' }]
        });
      }

      // Return signed JWT to client
      const payload = { user: { id: user.id } };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '12h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;

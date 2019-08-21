const express = require('express');
// Breaks up our routes into separate files. Routes can then be loaded into server.js
const router = express.Router();
// Bring in express-validator to validate input and report any errors before completing request and sending a response
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../../models/User');

// @route   POST /api/users/
// @desc    Register user
// @access  Public
router.post(
  '/',
  [
    // Use validators to check input. If check() returns false then it throws an error
    // @todo sanitizers
    check('firstName', 'Please enter your first name')
      .not()
      .isEmpty(),
    check('lastName', 'Please enter your last name')
      .not()
      .isEmpty(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    check('email', 'Please enter a valid email').isEmail()
  ],
  async (req, res) => {
    // Check if express-validator found any errors
    // Note, not sanitized
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // Destructure input fields from req.body
    const { firstName, lastName, email, password } = req.body;

    try {
      // Check if there is an existing user by querying the User model
      // Search email field with email from req.body (destructured)
      // If email already exists then send error in same format as express-validator
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({
          errors: [{ msg: 'User already exists' }]
        });
      }

      // Create new User instance using inputs from req.body
      // Note, destructured
      user = new User({
        firstName,
        lastName,
        email,
        password
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save new user. Note that we save the ENCRYPTED password
      user.save();

      // Return JWT

      console.log(req.body);
      res.send('User route');
    } catch (err) {
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;

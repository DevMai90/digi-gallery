const express = require('express');
// Breaks up our routes into separate files. Routes can then be loaded into server.js
const router = express.Router();
// Bring in express-validator to validate input and report any errors before completing request and sending a response
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
const multerS3 = require('../../middleware/multerS3');

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
    check('email', 'Please enter a valid email').isEmail(),
    check('about', 'Maximum length allowed is 1,000 characters').isLength({
      max: 1000
    }),
    check(
      'handle',
      'Handle must be greater than 8 characters and less than 32 characters in length'
    ).custom(value => {
      if (value !== '') {
        return value.trim().length >= 8 && value.trim().length <= 32;
      }
      return true;
    })
  ],
  async (req, res) => {
    // Check if express-validator found any errors
    // Note, not sanitized
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // Destructure input fields from req.body
    const { firstName, lastName, email, password, handle, about } = req.body;

    try {
      // Check if there is an existing user by querying the User model
      // Search email field with email from req.body (destructured)
      // If email already exists then send error in same format as express-validator
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({
          errors: [{ msg: 'User already exists' }]
        });
      } else if (handle) {
        // Check is handle is taken. If yes then send error in same format as express-validator
        let checkHandle = await User.findOne({ handle });

        if (checkHandle) {
          return res.status(422).json({
            errors: [{ msg: 'User handle is already taken' }]
          });
        }
      }

      // Create new User instance using inputs from req.body
      // Note, destructured
      user = new User({
        firstName,
        lastName,
        email,
        password,
        handle,
        about
      });

      // Encrypt password - Salt and Hash
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save new user. Note that we save the ENCRYPTED password
      // Mongoose returns a promise
      await user.save();

      // Return JWT to client - asynchronous, use callback
      const payload = { user: { id: user.id } };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: '12h'
        },
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

// @route   GET /api/users/me
// @desc    Retrieve current user's profile
// @access  Private - Using user id
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id }).select('-password');
    if (!user) {
      return res
        .status(400)
        .json({ error: [{ msg: 'Unable to locate user' }] });
    }

    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/users/update
// @desc    Update current user
// @access   Private
router.post('/update', auth, async (req, res) => {
  // @todo change password and avatar

  // Construct updated fields object
  const profileFields = {};
  profileFields.user = req.user.id;
  for (let field in req.body) {
    if (req.body[field]) profileFields[field] = req.body[field];
  }

  try {
    let user = await User.findOne({ _id: req.user.id });

    if (user) {
      if (profileFields.newPassword) {
        // Check password
        const isMatch = await bcrypt.compare(
          profileFields.oldPassword,
          user.password
        );

        if (isMatch) {
          const salt = await bcrypt.genSalt(10);
          profileFields.password = await bcrypt.hash(
            profileFields.newPassword,
            salt
          );
        } else {
          return res.status(400).json({
            errors: [{ msg: 'Invalid password. Please check password input.' }]
          });
        }
      }

      // Finds first document matching the given filter
      let filter = { _id: req.user.id };
      // $set replaces the value of a field with the specified value.
      // Remember, we are passing in an object. The fields included in the object will be updated.
      // Set will create a new field if it does not already exist
      let update = { $set: profileFields };
      // fineOneAndUpdate returns document BEFORE update by default. Must add new: true to return updated document
      let newDoc = { new: true };

      // fineOneAndUpdate saves
      user = await User.findOneAndUpdate(filter, update, newDoc);
    }
    return res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/users
// @desc    Delete current user
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    // @todo Delete user's posts
    // Delete user
    await User.findOneAndDelete({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/users/avatar
// @desc    Update avatar
// @access  Private
router.put('/avatar', auth, async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.user.id }).select('-password');

    await multerS3.uploadAvatar(req, res, err => {
      if (err) {
        return res.status(422).send({ errors: [{ msg: err.message }] });
      }

      user.avatar = req.file.location;
      user.save();
      res.json(user);
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/users/avatar
// @desc    Delete user's uploaded avatar.
// @access  Private
router.delete('/avatar', auth, async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.user.id }).select('-password');

    multerS3.deleteAvatar(req.user.id);

    user.avatar = undefined;
    user.save();
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Sever Error');
  }
});

module.exports = router;

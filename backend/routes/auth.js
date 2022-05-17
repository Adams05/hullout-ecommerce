const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User'); // Bring in User model

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
  // Get user from database using mongoose
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @route   POST api/auth
// @desc    Auth user & get token
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Check to see if user exists
    try {
      let user = await User.findOne({ email });

      // If no user exists send back 400 error with message.
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      // use brcrypt to compare passwords with plain text password and users password.
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.stauts(400).json({ msg: 'Invalid Credentials ' });
      }

      // Object that is being sent in the jwt
      const payload = {
        user: {
          id: user.id,
        },
      };
      // Sign jwt with payload and jwt secret from config file.
      // Set jwt to expire after an hour.
      // if theres an error throw the error. if not send the token.
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;

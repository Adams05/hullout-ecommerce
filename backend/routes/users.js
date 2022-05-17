const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User'); // Bring is user model

// @route   POST api/users
// @desc    Register a user
// @access  Public

// Set checks for input fields using express validator
router.post(
  '/',
  [
    check('name', 'Name add name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({
      min: 6,
    }),
  ],
  // pass the request into validationResult.
  // Check if errors is not empty and pass a 400 error
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure from req.body
    const { name, email, password } = req.body;

    // check to see if users email already exists with mongoose findOne function.
    // If user exists pass a 400 with a failed message.
    // If user does not exist set variable equal to new User model.
    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({
        name,
        email,
        password,
      });

      // Use bcrypt to hash password
      // Create new salt with genSalt
      // Save user in db
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

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

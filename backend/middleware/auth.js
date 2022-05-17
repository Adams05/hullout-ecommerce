const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  // If no token send 401 (unauthorized) with message.
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied.' });
  }

  // Verify token and pull out payload.
  // Set user to payload
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid ' });
  }
};

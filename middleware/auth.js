const jwt = require('jsonwebtoken');
const config = require('config');

// Custom middleware to verify JWT during API requests for authentication
// No need to place into a variable. The entire module is our middleware.
// This middleware will be used in protected routes to authenticate user

// Middleware intercepts the req and res parameters. next() is to call the next middleware function in the stack
module.exports = function(req, res, next) {
  // Get token from the authorization header. When we send request to a protected route, we must send a header. In this case we are getting it from 'x-auth-token'.

  // Headers are available in the req object. This is the signed JWT we receive back from the client

  // .headers list all headers. .header() finds specific header type
  const token = req.header('x-auth-token');

  // Check if there is no token
  if (!token) res.status(401).json({ msg: 'No token, not authorized' });

  // Verify token
  try {
    // decoded object will have our JWT payload. This information is visible!
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // Set user to decoded user on our request
    // user is derived from our decoded token (authentication!)
    req.user = decoded.user;
    // Moves to next middleware in stack
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};

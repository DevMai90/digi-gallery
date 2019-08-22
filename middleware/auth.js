const jwt = require('jsonwebtoken');
const config = require('config');

// Custom middleware to verify JWT during API requests for authentication
// No need to place into a variable. The entire module is our middleware.
// This middleware will be used in protected routes to authenticate user

// Middleware intercepts the req and res parameters. next() is to call the next middleware function in the stack
module.exports = function(req, res, next) {
  // Get token from the authorization header. When we send request to a protected route, we must send a header. In this case we are getting it from 'x-auth-token'.

  // Headers are available in the req object. This is the signed JWT we receive back from the client
  const token = req.headers('x-auth-token');

  // Check if there is no token
  if (!token) res.status(401).json({ msg: 'No token, not authorized' });

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // DEVELOPMENT ONLY
    console.log(req);

    // Set user to decoded user
    req.user = decoded.user;

    // DEVELOPMENT ONLY
    console.log(decoded);
    console.log(decoded.user);

    // Moves to next middleware in stack
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};

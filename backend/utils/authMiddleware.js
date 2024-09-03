// server/utils/authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware to verify the token for authenticated routes
const authMiddleware = (req, res, next) => {
  // Get the token from the request headers (or other locations if needed)
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];

  // If no token is found, deny access
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token using a secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the user information from the decoded token to the request object
    req.user = decoded;
    
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If the token is invalid, send an unauthorized response
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;

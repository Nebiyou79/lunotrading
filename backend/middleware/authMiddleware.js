// Middlewares/authMiddleware.js
const dotenv = require('dotenv');
dotenv.config();
const User = require('../models/User');  // Correct path to your User model
const jwt = require('jsonwebtoken');

// Check if the user is an admin
exports.isAdmin = async (req, res, next) => {
  try {
    // The token decoding should have already populated req.user with the user's id
    const user = await User.findById(req.user.id); // Use req.user set from JWT
    
    // If user is found and has the role 'admin'
    if (user && user.role === 'admin') {
      next(); // Proceed to the next middleware/controller
    } else {
      res.status(403).json({ message: 'Access denied, admin only' }); // Not an admin
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log("Token received: ", token);

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token: ", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification error: ", error);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};
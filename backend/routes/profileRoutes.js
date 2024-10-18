// routes/profileRoutes.js
const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const { updateUserProfile, getUserProfile, changePassword } = require('../controllers/profileController');

const router = express.Router();

// Get user profile
router.get('/', authenticateToken, getUserProfile);  // Make sure this is correct

// Change password
router.post('/change-password', authenticateToken, changePassword);

// Update user profile
router.put('/update', authenticateToken, updateUserProfile);

module.exports = router;

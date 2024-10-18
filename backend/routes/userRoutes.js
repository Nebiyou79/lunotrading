// routes/userRoutes.js
const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const { getUserProfile, adminDashboard } = require('../controllers/userController');
const router = express.Router();

// Protected route
router.get('/profile', protect, getUserProfile);

// Admin-only route
router.get('/admin', protect, authorize('admin'), adminDashboard);

module.exports = router;

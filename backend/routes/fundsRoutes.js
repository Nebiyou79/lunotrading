const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const { depositFunds, withdrawFunds, getBalance } = require('../controllers/fundsController');
const upload = require('../middleware/fileUploadMiddleware'); // Middleware for handling file uploads

const router = express.Router();

// Route for deposit proof submission
router.post('/deposit', authenticateToken, upload, depositFunds);

// Route for withdrawal requests
router.post('/withdraw', authenticateToken, withdrawFunds);

// Route for fetching user balance
router.get('/balance', authenticateToken, getBalance);


module.exports = router;

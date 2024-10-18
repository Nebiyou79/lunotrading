const express = require('express');
const { getCryptoPrices, getHistoricalPrices } = require('../controllers/pricesController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to get real-time prices
router.get('/prices', authenticateToken, getCryptoPrices);

// Route to get historical prices
router.get('/prices/historical', authenticateToken, getHistoricalPrices);

module.exports = router;

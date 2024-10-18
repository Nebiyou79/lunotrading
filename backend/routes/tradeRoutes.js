const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const { placeTrade, getUserTradeHistory, getAutoMode, decideTradeOutcome, endTrade, setAutoMode } = require('../controllers/tradeController');
const router = express.Router();

// Route to place a trade
router.post('/place', authenticateToken, placeTrade);
router.get('/history', authenticateToken, getUserTradeHistory);

router.post('/decide-trade', decideTradeOutcome); // Ensure this route is defined
router.put('/trade/end/:tradeId', authenticateToken, endTrade);
router.put('/automode/:userId', setAutoMode);
router.get('/automode/:userId', getAutoMode);
module.exports = router;

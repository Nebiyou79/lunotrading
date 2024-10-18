const express = require('express');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { submitTicket, getTickets } = require('../controllers/supportController');

const router = express.Router();

// Route to submit a support ticket
router.post('/submit', authenticateToken, submitTicket);

// Route to get support tickets (Admins get all tickets, Users get their own)
router.get('/tickets', authenticateToken, getTickets);

module.exports = router;

// routes/depositAddressRoutes.js
const express = require('express');
const router = express.Router();
const depositAddressController = require('../controllers/depositAddressController');

// Get deposit addresses
router.get('/addresses', depositAddressController.getDepositAddresses);

// Update deposit addresses (protected route for admin)
router.put('/addresses', depositAddressController.updateDepositAddresses);

module.exports = router;

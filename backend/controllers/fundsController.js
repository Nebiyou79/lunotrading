const User = require('../models/User');
const Withdrawal = require('../models/Withdrawal');
const Deposit = require('../models/Deposit');

// Handle Deposit
exports.depositFunds = async (req, res) => {
    const { amount, currency } = req.body;
    const userId = req.user.id; 
    if (!req.file) {
      return res.status(400).json({ message: 'Proof of deposit file is required.' });
    }
    const deposit = new Deposit({
      userId,
      amount,
      currency,
      proofFilePath: req.file.path,
      status: 'pending',
    });  
    await deposit.save(); 
    res.status(201).json({ message: 'Deposit request submitted successfully.' });
  };
// Handle Withdrawal
exports.withdrawFunds = async (req, res) => {
    try {
        const { amount, address } = req.body;
        const userId = req.user.id; // Assuming user ID is retrieved from authentication
        if (!amount || !address) {
            return res.status(400).json({ message: 'Amount and address are required.' });
        }
        if (amount <= 0) {
            return res.status(400).json({ message: 'Invalid withdrawal amount.' });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        if (user.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance.' });
        }
        const withdrawal = new Withdrawal({
            userId,
            amount,
            address,
            status: 'pending'
        });
        await withdrawal.save();
        res.status(201).json({ message: 'Withdrawal request submitted successfully.' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Failed to process withdrawal.', error: error.message });
    }
};
// Get balance
exports.getBalance = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        const user = await User.findById(req.user.id).select('balance');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ balance: user.balance });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
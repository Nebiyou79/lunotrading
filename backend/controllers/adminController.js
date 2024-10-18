// controllers/adminController.js
const Trade = require('../models/Trade');
const User = require('../models/User');
const KycModel = require('../models/KYC');
const Deposit = require('../models/Deposit');
const Withdrawal = require('../models/Withdrawal');

// Get all trades in descending order of creation date
exports.getAllTrades = async (req, res) => {
  try {
    const trades = await Trade.find()// Fetch trades from the database
      .populate('user', 'name email') // Populate user field with username and email
      .exec(); 
    res.json(trades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching trades' });
  }
};
// Update User Balance (for admin only)
exports.updateUserBalance = async (req, res) => {
  const { userId } = req.params; 
  const { balance } = req.body;
  try {
    // Find the user by ID
    const user = await User.findByIdAndUpdate(userId, { balance }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User balance updated', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, balance } = req.body;
    // Find user by ID and update
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, balance },
      { new: true } // Return the updated user
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
// Approve/Reject KYC Status
exports.approveRejectKyc = async (req, res) => {
  const { userId } = req.params;  // Get the userId from the request parameters
  const { action } = req.body;    // Get the action ('approve' or 'reject') from the request body
  if (!action) {
    return res.status(400).json({ message: 'Action is required' });
  }
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const kyc = await KycModel.findOne({ userId });
    if (!kyc) {
      return res.status(404).json({ message: 'KYC not found for this user' });
    }
    if (action === 'approve') {
      kyc.status = 'approved';
    } else if (action === 'reject') {
      kyc.status = 'rejected';
    } else {
      return res.status(400).json({ message: 'Invalid action provided' });
    }
    await kyc.save();
    res.status(200).json({ message: 'KYC updated successfully', kyc });
  } catch (error) {
    console.error('Error handling KYC:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
// Get All Users (Admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Retrieve all users
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};
// Update User Data (Admin only)
exports.updateUserBalanceAndRole = async (req, res) => {
  const { userId } = req.params;
  const { balance, role } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (balance !== undefined) user.balance = balance;
    if (role !== undefined) user.role = role;
    await user.save();
    res.json({ message: 'User data updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};
// Fetch pending deposits
exports.getPendingDeposits = async (req, res) => {
  try {
    // Fetch deposits and populate the userId to retrieve the user's email and balance
    const deposits = await Deposit.find({ status: 'pending' })
      .populate('userId', 'email balance')  // Populating both the 'email' and 'balance' fields from the User model
      .exec();
    if (!deposits) {
      return res.status(404).json({ message: 'No pending deposits found' });
    }
    res.json(deposits);  // Send the deposits as JSON
  } catch (error) {
    console.error('Error fetching deposits:', error);
    res.status(500).json({ message: 'Failed to fetch pending deposits', error });
  }
};
// Fetch pending withdrawals
exports.getPendingWithdrawals = async (req, res) => {
  try {
      const pendingWithdrawals = await Withdrawal.find({ status: 'pending' }).populate('userId', 'email balance');
      res.status(200).json(pendingWithdrawals);
  } catch (error) {
      res.status(500).json({ message: 'Failed to fetch pending withdrawals', error: error.message });
  }
};
// Approve Deposit
exports.approveDeposit = async (req, res) => {
  const { depositId } = req.params;
  try {
      const deposit = await Deposit.findById(depositId);
      if (!deposit) {
          return res.status(404).json({ message: 'Deposit request not found' });
      }
      const user = await User.findById(deposit.userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      user.balance += deposit.amount;
      await user.save();
      deposit.status = 'approved';
      await deposit.save();
      res.status(200).json({ message: 'Deposit approved successfully', deposit, updatedBalance: user.balance });
  } catch (error) {
      res.status(500).json({ message: 'Failed to approve deposit', error: error.message });
  }
};
  // Reject Deposit
  exports.rejectDeposit = async (req, res) => {
    const { depositId } = req.params; // Assuming deposit ID is passed in the URL
    try {
      const deposit = await Deposit.findById(depositId);
      if (!deposit) {
        return res.status(404).json({ message: 'Deposit not found.' });
      } 
      deposit.status = 'rejected';
      await deposit.save();  
      res.status(200).json({ message: 'Deposit request rejected successfully.' });
    } catch (error) {
      console.error('Error rejecting deposit:', error);
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  };
// Approve Withdrawal
exports.approveWithdrawal = async (req, res) => {
  const { withdrawalId } = req.params;
  try {
      const withdrawal = await Withdrawal.findById(withdrawalId);
      if (!withdrawal) {
          return res.status(404).json({ message: 'Withdrawal request not found' });
      }
      const user = await User.findById(withdrawal.userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      if (user.balance < withdrawal.amount) {
          return res.status(400).json({ message: 'Insufficient balance for withdrawal' });
      }
      user.balance -= withdrawal.amount;
      await user.save();
      withdrawal.status = 'approved';
      await withdrawal.save();
      res.status(200).json({ message: 'Withdrawal approved successfully', withdrawal, updatedBalance: user.balance });
  } catch (error) {
      res.status(500).json({ message: 'Failed to approve withdrawal', error: error.message });
  }
};
// Reject Withdrawal
exports.rejectWithdrawal = async (req, res) => {
  const { withdrawalId } = req.params;
  try {
      const withdrawal = await Withdrawal.findById(withdrawalId);
      if (!withdrawal) {
          return res.status(404).json({ message: 'Withdrawal request not found' });
      }
      const user = await User.findById(withdrawal.userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      if (user.balance < withdrawal.amount) {
          return res.status(400).json({ message: 'Insufficient balance for withdrawal' });
      }
      withdrawal.status = 'rejected';
      await withdrawal.save();
      res.status(200).json({ message: 'Withdrawal reject successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Failed to reject withdrawal', error: error.message });
  }
};
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select('name email'); // Select only name and email
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

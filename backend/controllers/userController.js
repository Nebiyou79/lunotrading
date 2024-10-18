// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
// Fetch user balance
const getUserBalance = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Fetch user by their ID from the JWT token
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ balance: user.balance }); // Send back the user's balance
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Fetch trade history
const getTradeHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Fetch user by their ID from the JWT token
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ tradeHistory: user.tradeHistory }); // Send back the user's trade history
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Fetch transaction logs
const getTransactionLogs = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Fetch user by their ID from the JWT token
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ transactionLogs: user.transactionLogs }); // Send back the user's transaction logs
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
// User Registration
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 2. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create a new user
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // 4. Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Send response with token
    res.status(201).json({ token, user: { id: user._id, email: user.email, role: user.role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// User Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 2. Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 3. Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // 4. Send the token in the response
      // Send response with token
      res.status(200).json({ token, user: { id: user._id, email: user.email, role: user.role } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

  
module.exports = { getUserBalance, getTradeHistory, getTransactionLogs, login, register };

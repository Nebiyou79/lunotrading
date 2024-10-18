const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// User Registration
exports.register = async (req, res) => {
  const { name, email, password, role = 'user' } = req.body; // Set default role to 'user'
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role }); // Save role
    await user.save();
    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
// User Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '30d', 
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
// Get All Users (for admin)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
// Edit User (for admin)
exports.editUser = async (req, res) => {
  const { email, balance } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { email, balance }, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
// Delete User (for admin)
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send(); 
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new User({ name, email, password: hashedPassword, role: 'admin' });
    await newAdmin.save();
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating admin' });
  }
};

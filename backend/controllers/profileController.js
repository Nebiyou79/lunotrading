// controllers/profileController.js
const User = require('../models/User');
const Trade = require('../models/Trade');
const bcrypt = require('bcryptjs');

exports.updateUserProfile = async (req, res) => {
  const { name, email } = req.body;
  const userId = req.user.id;  // Get the user ID from the authenticated token
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId, 
      { name, email }, 
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
exports.getUserProfile = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    const tradeHistory = await Trade.find({ user: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      message: 'User profile fetched successfully',
      user,
      tradeHistory,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect old password' });
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);  // Log the error details to the console
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

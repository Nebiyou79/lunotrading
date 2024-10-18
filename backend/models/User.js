const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  balance: { type: Number, default: 0 },
  kycDocuments: { type: Array, default: [] }, // Array to store KYC documents
  kycStatus: { type: String, enum: ['pending', 'approved', 'rejected', 'verified'], default: 'pending' },// KYC status
  autoMode: {
    type: String,
    enum: ['alwaysWin', 'alwaysLose', 'off'],  // Modes for automatic results
    default: 'off'
  } 
 });

// Virtual method to check admin
UserSchema.virtual('isAdmin').get(function() {
  return this.role === 'admin';
});

module.exports = mongoose.model('User', UserSchema);

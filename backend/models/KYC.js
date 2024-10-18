const mongoose = require('mongoose');

const kycSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true, 
    unique: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'verified'],
    default: 'pending',
  },
  kycDocuments: {
    type: [String], // Array of document URLs
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('KYC', kycSchema);

const mongoose = require('mongoose');

const depositSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    proofFilePath: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'], // Added rejected status
      default: 'pending',
    },
  });

const Deposit = mongoose.model('Deposit', depositSchema);
module.exports = Deposit;

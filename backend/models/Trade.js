const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assetId: { type: String, required: true },
  capital: { type: Number, required: true },
  returnRate: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'win', 'lose'], default: 'pending' },
  // direction: { type: String, enum: ['Up', 'Down'], required: true },
  resultAmount: { type: Number, default: 0 }, // Profit or Loss amount
  transactionFee: { type: Number, required: true },
  duration: { type: Number, required: true }, // Duration chosen by the user
  autoMode: { type: String, enum: ['on', 'off'], default: 'off' }
}, { timestamps: true });

module.exports = mongoose.model('Trade', tradeSchema);

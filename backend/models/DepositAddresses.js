const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DepositAddressSchema = new Schema({
  usdtAddress: {
    type: String,
    required: [true, 'USDT address is required']
  },
  btcAddress: {
    type: String,
    required: [true, 'BTC address is required']
  },
  ethAddress: {
    type: String,
    required: [true, 'ETH address is required']
  }
});

const DepositAddress = mongoose.model('DepositAddress', DepositAddressSchema);

module.exports = DepositAddress;

const DepositAddress = require('../models/DepositAddresses');

// Get current deposit addresses
exports.getDepositAddresses = async (req, res) => {
  try {
    const addresses = await DepositAddress.findOne();
    if (!addresses) {
      return res.status(404).json({ message: 'Addresses not found' });
    }
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching deposit addresses', error });
  }
};
// Update deposit addresses
exports.updateDepositAddresses = async (req, res) => {
  const { usdtAddress, btcAddress, ethAddress } = req.body;
  try {
    let addresses = await DepositAddress.findOne();
    if (!addresses) {
      addresses = new DepositAddress({ usdtAddress, btcAddress, ethAddress });
    } else {
      addresses.usdtAddress = usdtAddress || addresses.usdtAddress;
      addresses.btcAddress = btcAddress || addresses.btcAddress;
      addresses.ethAddress = ethAddress || addresses.ethAddress;
    }
    await addresses.save();
    res.json({ message: 'Addresses updated successfully', addresses });
  } catch (error) {
    res.status(500).json({ message: 'Error updating deposit addresses', error });
  }
};

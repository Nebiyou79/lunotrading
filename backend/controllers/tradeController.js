const Trade = require('../models/Trade');
const User = require('../models/User');

// Place a trade
// Place a trade
exports.placeTrade = async (req, res) => {
  try {
    const { assetId, capital, returnRate, duration, transactionFee, direction } = req.body;  // Added direction
    const userId = req.user.id;

    // Validate direction
    // if (!['Up', 'Down'].includes(direction)) {
    //   return res.status(400).json({ message: 'Invalid trade direction' });
    // }

    // Fetch the user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if the user has sufficient balance
    if (user.balance < capital) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Deduct the capital from the user's balance
    user.balance -= capital;
    await user.save();

    // Create a new trade
    const newTrade = await Trade.create({
      user: userId,
      assetId,
      capital,
      returnRate,
      duration,
      transactionFee,
      // direction,  // Save the direction in the trade record
      status: 'pending',
    });

    // Respond with the new trade details and updated user balance
    res.status(201).json({
      trade: newTrade,
      balance: user.balance, // Include updated balance in the response
    });

    // Set a timeout to automatically end the trade after the duration
    setTimeout(async () => {
      try {
        const dummyRes = {
          status: () => dummyRes,
          json: () => dummyRes,
          headersSent: false,
        };

        await exports.endTrade({ params: { tradeId: newTrade._id } }, dummyRes);
      } catch (error) {
        console.error(`Error ending trade ${newTrade._id}:`, error);
      }
    }, duration * 1000); // Duration in seconds

  } catch (error) {
    console.error('Error placing trade:', error);
    return res.status(500).json({ message: 'Error placing trade' });
  }
};

exports.getUserTradeHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const userTrades = await Trade.find({ user: userId }).sort({ createdAt: -1 });
    return res.status(200).json(userTrades); // `direction` will be included in each trade
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching trade history' });
  }
};

exports.decideTradeOutcome = async (req, res) => {
  try {
    const { tradeId, outcome } = req.body;    
    if (!tradeId || !outcome) {
      return res.status(400).json({ message: 'Missing tradeId or outcome' });
    }    
    const trade = await Trade.findById(tradeId).populate('user');
    if (!trade) {
      return res.status(404).json({ message: 'Trade not found' });
    }
    if (outcome === 'win') {
      const winAmount = (trade.capital * trade.returnRate ) / 100;
      trade.resultAmount = winAmount;
      trade.user.balance += trade.capital + winAmount;
    } else if (outcome === 'lose') {
      trade.resultAmount = 0;
    } else {
      return res.status(400).json({ message: 'Invalid outcome value' });
    }
    trade.status = outcome;
    await trade.save();
    await trade.user.save();
    return res.status(200).json({ message: `Trade marked as ${outcome}` });
  } catch (error) {
    console.error('Error deciding trade outcome:', error);
    return res.status(500).json({ message: 'Error deciding trade outcome' });
  }
};
exports.endTrade = async (req, res) => {
  try {
    const { tradeId } = req.params;
    const trade = await Trade.findById(tradeId).populate('user');
    if (!trade) {
      return res.status(404).json({ message: 'Trade not found' });
    }
    if (trade.status !== 'pending') {
      return res.status(400).json({ message: 'Trade is already finished' });
    }
    const userAutoMode = trade.user.autoMode;
    let outcome;
    if (userAutoMode === 'alwaysWin') {
      outcome = 'win';
    } else if (userAutoMode === 'alwaysLose') {
      outcome = 'lose';
    } else {
      outcome = Math.random() < 0.5 ? 'win' : 'lose';
    }
    const resultAmount = (trade.capital * trade.returnRate) / 100;
    if (outcome === 'win') {
      trade.user.balance += trade.capital + resultAmount - trade.transactionFee;
    } else {
      trade.user.balance += trade.capital - resultAmount - trade.transactionFee;;
    }
    trade.resultAmount = resultAmount;
    trade.status = outcome;
    await trade.save();
    await trade.user.save();
    return res.status(200).json({ message: `Trade ended as ${outcome}`, trade });
  } catch (error) {
    console.error('Error ending trade:', error);
    if (!res.headersSent) {
      return res.status(500).json({ message: 'Error ending trade' });
    }
  }
};
// Controller to set Auto Mode
exports.setAutoMode = async (req, res) => {
  const { userId } = req.params;
  const { autoMode } = req.body;
  try {
    if (!['alwaysWin', 'alwaysLose', 'off'].includes(autoMode)) {
      return res.status(400).json({ message: 'Invalid auto mode' });
    }
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.autoMode = autoMode;
    await user.save();
    return res.status(200).json({ message: 'Auto mode updated successfully', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating auto mode' });
  }
};
exports.getAutoMode = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json({ autoMode: user.autoMode });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching auto mode' });
  }
};

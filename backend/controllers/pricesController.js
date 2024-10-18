const axios = require('axios');

// Fetch real-time cryptocurrency prices for trading
exports.getCryptoPrices = async (req, res) => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 100,
        page: 1,
        sparkline: false,
      },
    });
    return res.json(response.data);
  } catch (error) {
    console.error('Error fetching real-time prices:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
// Fetch historical prices for charts
exports.getHistoricalPrices = async (req, res) => {
  const { coinId, days } = req.query; // Expecting coinId and days from the query parameters
  if (!coinId || !days) {
    return res.status(400).json({ message: 'Missing required parameters: coinId and days' });
  }
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: days,
      },
    });
    return res.json(response.data);
  } catch (error) {
    console.error('Error fetching historical prices:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

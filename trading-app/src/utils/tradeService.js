// services/tradeService.js
import axios from 'axios';

const API_URL = 'https://116.203.108.180:5000/api';

// Function to get all trades
export const getAllTrades = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/trades`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching trades:', error);
    throw error;
  }
};
// Function to get user by ID
export const getUserById = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  };
// Function to decide trade outcome
export const decideTradeOutcome = async (tradeData) => {
  try {
    const response = await axios.post(
      `${API_URL}/decide-trade`,
      tradeData, // Correctly send tradeId and outcome here
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    
    // Handle the response correctly
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.statusText || 'Error deciding trade outcome');
    }
  } catch (error) {
    console.error('Error deciding trade outcome:', error);
    throw error;
  }
};
// Place trade service
// Place trade service
export const placeTrade = async (tradeData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found, please log in again.');
    const response = await axios.post(`${API_URL}/trade/place`, tradeData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error placing trade:', error);
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Error placing trade.');
    } else {
      throw new Error('Network error, please try again later.');
    }
  }
};


// Get user trade history
export const getUserTradeHistory = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/trade/history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

//AUTO MODE 
export const endTrade = async (tradeId) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_URL}/trade/end/${tradeId}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

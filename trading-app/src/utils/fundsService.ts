// services/apiService.js
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:5000/api'; // Change to your actual API URL



const apiService = {
  getBalance: async (token: string) => {
    try {
      const response = await axios.get(`${API_URL}/funds/balance`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return (response.data as { balance: number }).balance;
    } catch (error) {
      console.error('Error fetching balance:', error);
      throw error;
    }
  },

  withdraw: async (data: { amount: number; address: string }, token: string) => {
    try {
      const { amount, address } = data;
      const response = await axios.post(`${API_URL}/funds/withdraw`, { amount, address }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      return response.data;
    } catch (error: unknown) {
      toast.error('Error updating user balance');
      throw error;
   }
  },
  // utils/fundsService.js

  deposit: async (formData: FormData, token: string) => {
    try {
      const response = await axios.post(`${API_URL}/funds/deposit`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Important for file upload
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error processing deposit:', error);
      throw error;
    }
  },
  
};

export default apiService;

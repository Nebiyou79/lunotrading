import axios from 'axios';
import { toast } from 'react-toastify';

// Base API URL
const API_URL = 'http://localhost:5000/api/admin';

// Function to get the token from localStorage
const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Create a configured axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add an interceptor to inject the token into the Authorization header before every request
axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Set Trade Outcome (win or lose)
export const setTradeOutcome = async (tradeId: string, outcome: string) => {
  try {
    const response = await axiosInstance.post(`/trade/${tradeId}/outcome`, { outcome });
    return response.data;
  } catch (error) {
    toast.error('Error setting trade outcome:');
    throw error;
  }
};

// Update User Balance (admin only)
export const updateUserBalance = async (userId: string, balance: number) => {
  try {
    const response = await axiosInstance.put(`/user/${userId}/balance`, { balance });
    return response.data;
  } catch (error) {
    toast.error('Error updating user balance');
    throw error;
  }
};

// Get All Users (admin only)
export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get('/users');
    return response.data;
  } catch (error) {
    toast.error('Error fetching all users:');
    throw error;
  }
};

// Update User Data (Balance & Role)
export const updateUserBalanceAndRole = async (userId: string, balance: number, role: string) => {
  try {
    const response = await axiosInstance.put(`/user/${userId}`, { balance, role });
    return response.data;
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};

// Set Trade Result Manually
export const setTradeResult = async (tradeId: string, result: 'win' | 'lose') => {
  try {
    const response = await axiosInstance.post('/trade/result', { tradeId, result });
    return response.data;
  } catch (error) {
    toast.error('Error setting trade result:');
    throw error;
  }
};

// Get Pending Deposits
export const getPendingDeposits = async () => {
  try {
    const response = await axiosInstance.get('/deposits/pending');
    return response.data;
  } catch (error) {
    toast.error('Error fetching pending deposits:');
    throw error;
  }
};

// Get Pending Withdrawals
export const getPendingWithdrawals = async () => {
  try {
    const response = await axiosInstance.get('/withdrawals/pending');
    return response.data;
  } catch (error) {
    toast.error('Error fetching pending withdrawals:');
    throw error;
  }
};

// Approve Deposit
export const approveDeposit = async (depositId: string) => {
  try {
    const response = await axiosInstance.put(`/deposits/${depositId}/approve`);
    return response.data;
  } catch (error) {
    console.error('Error approving deposit:', error);
    throw error;
  }
};

// Reject Deposit
export const rejectDeposit = async (depositId: string) => {
  try {
    const response = await axiosInstance.delete(`/deposits/${depositId}/reject`);
    return response.data;
  } catch (error) {
    console.error('Error rejecting deposit:', error);
    throw error;
  }
};

// Approve Withdrawal
export const approveWithdrawal = async (withdrawalId: string) => {
  try {
    const response = await axiosInstance.put(`/withdrawals/${withdrawalId}/approve`);
    return response.data;
  } catch (error) {
    console.error('Error approving withdrawal:', error);
    throw error;
  }
};

export const rejectWithdrawal = async (withdrawalId: string) => {
  try {
    const response = await axiosInstance.put(`/withdrawals/${withdrawalId}/reject`);
    return response.data;
  } catch (error) {
    console.error('Error rejecting withdrawal:', error);
    throw error;
  }
};




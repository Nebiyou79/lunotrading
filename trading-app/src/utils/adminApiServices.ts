import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'https://116.203.108.180:5000/api/admin';
const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});
axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
export const setTradeOutcome = async (tradeId: string, outcome: string) => {
  try {
    const response = await axiosInstance.post(`/trade/${tradeId}/outcome`, { outcome });
    return response.data;
  } catch (error) {
    toast.error('Error setting trade outcome:');
    throw error;
  }
};
export const updateUserBalance = async (userId: string, balance: number) => {
  try {
    const response = await axiosInstance.put(`/user/${userId}/balance`, { balance });
    return response.data;
  } catch (error) {
    toast.error('Error updating user balance');
    throw error;
  }
};
export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get('/users');
    return response.data;
  } catch (error) {
    toast.error('Error fetching all users:');
    throw error;
  }
};
export const updateUserBalanceAndRole = async (userId: string, balance: number, role: string) => {
  try {
    const response = await axiosInstance.put(`/user/${userId}`, { balance, role });
    return response.data;
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};
export const setTradeResult = async (tradeId: string, result: 'win' | 'lose') => {
  try {
    const response = await axiosInstance.post('/trade/result', { tradeId, result });
    return response.data;
  } catch (error) {
    toast.error('Error setting trade result:');
    throw error;
  }
};
export const getPendingDeposits = async () => {
  try {
    const response = await axiosInstance.get('/deposits/pending');
    return response.data;
  } catch (error) {
    toast.error('Error fetching pending deposits:');
    throw error;
  }
};
export const getPendingWithdrawals = async () => {
  try {
    const response = await axiosInstance.get('/withdrawals/pending');
    return response.data;
  } catch (error) {
    toast.error('Error fetching pending withdrawals:');
    throw error;
  }
};
export const approveDeposit = async (depositId: string) => {
  try {
    const response = await axiosInstance.put(`/deposits/${depositId}/approve`);
    return response.data;
  } catch (error) {
    console.error('Error approving deposit:', error);
    throw error;
  }
};
export const rejectDeposit = async (depositId: string) => {
  try {
    const response = await axiosInstance.delete(`/deposits/${depositId}/reject`);
    return response.data;
  } catch (error) {
    console.error('Error rejecting deposit:', error);
    throw error;
  }
};
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
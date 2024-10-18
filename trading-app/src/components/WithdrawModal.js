// components/WithdrawModal.js

import React, { useState } from 'react';
import apiService from '../utils/fundsService';
import { toast } from 'react-toastify';

const WithdrawModal = ({ showWithdrawalModal, setShowWithdrawalModal, token }) => {
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleWithdraw = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
        // Ensure that amount is a number and address is a string
        const numericAmount = parseFloat(amount); // Convert amount to a number
        if (isNaN(numericAmount)) {
            throw new Error('Invalid amount');
        }
        console.log('Sending data:', { amount: numericAmount, address });

        const result = await apiService.withdraw({
            amount: numericAmount, // Pass the amount as a number
            address: address // Pass the address directly
        }, token);

        setMessage(`Withdrawal successful: ${result.message}`);
        toast.success(result.message);
        setAmount('');
        setAddress('');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err) {
        console.error('Error details:', err.response?.data || err.message);
        setError('Failed to withdraw funds. Please try again.');
        toast.error(err.message);
    }
};

  return (
    <>
      {showWithdrawalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl mb-4">Withdrawal</h2>
            <form onSubmit={handleWithdraw}>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount" 
                className="w-full p-2 mb-4 bg-gray-900 text-white rounded"
                required
              />
              <input 
                type="text" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Your Address" 
                className="w-full p-2 mb-4 bg-gray-900 text-white rounded"
                required
              />
              <button 
                type="submit" 
                className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
              >
                Submit
              </button>
            </form>
            {message && <p className="text-green-500">{message}</p>}
            {error && <p className="text-red-500">{error}</p>}
            <button 
              className="mt-4 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded" 
              onClick={() => setShowWithdrawalModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default WithdrawModal;

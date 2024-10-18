/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import {getDepositAddresses,updateDepositAddresses} from '../../utils/depositService'; // Service to interact with the backend
import Sidebar from '../../components/admin/Sidebar'; // Assuming you have a Sidebar component
import { toast } from 'react-toastify';

const AdminDepositAddresses: React.FC<{ token: string }> = ({ token }) => {
  const [addresses, setAddresses] = useState({
    usdtAddress: '',
    btcAddress: '',
    ethAddress: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch current addresses when the component mounts
    const fetchAddresses = async () => {
      try {
        const response = await getDepositAddresses(token);
        setAddresses(response.data);
        toast.success('Fethed addresses')
      } catch (err) {
        setError('Error fetching deposit addresses');
        toast.error('Error fetching deposit addresses');
      }
    }; 
    fetchAddresses();
  }, [token]);

  const handleUpdate = async () => {
    try {
      const response = await updateDepositAddresses(addresses, token);
      setMessage('Addresses updated successfully');
      toast.success('Addresses updated successfully');
    } catch (err) {
      setError('Error updating deposit addresses');
      toast.error('Error updating deposit addresses')
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 h-screen p-6 text-white">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">Update Deposit Addresses</h1>

        {message && <p className="text-green-500 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
          {/* USDT Address */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">USDT Address</label>
            <input
              type="text"
              value={addresses.usdtAddress}
              onChange={(e) => setAddresses({ ...addresses, usdtAddress: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* BTC Address */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">BTC Address</label>
            <input
              type="text"
              value={addresses.btcAddress}
              onChange={(e) => setAddresses({ ...addresses, btcAddress: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* ETH Address */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">ETH Address</label>
            <input
              type="text"
              value={addresses.ethAddress}
              onChange={(e) => setAddresses({ ...addresses, ethAddress: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleUpdate}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105"
            >
              Update Addresses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDepositAddresses;

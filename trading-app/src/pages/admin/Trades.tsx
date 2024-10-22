import React, { useEffect, useState } from 'react';
import { getAllTrades, getUserById, decideTradeOutcome } from '../../utils/tradeService';
import Sidebar from '../../components/admin/Sidebar'; // Adjust the import path as needed
import { toast } from 'react-toastify';

interface Trade {
  _id: string;
  user: string | { _id: string };
  assetId: string;
  capital: number;
  returnRate: number;
  leverage: number;
  status: 'pending' | 'win' | 'lose';
  resultAmount: number;
}

interface User {
  _id: string;
  name: string;
  email: string;
}

const AdminTrades: React.FC = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [users, setUsers] = useState<{ [key: string]: User }>({}); // Store users by their ID

  useEffect(() => {
    const fetchTradesAndUsers = async () => {
      try {
        const tradesData = await getAllTrades();
        setTrades(tradesData);

        // Fetch user details for each trade
        const userIds = tradesData.map((trade: Trade) => {
          if (typeof trade.user === 'object' && '_id' in trade.user) {
            return trade.user._id; // If trade.user is an object, extract _id
          }
          return trade.user; // Otherwise, it's a string (user ID)
        });

        const uniqueUserIds = Array.from(new Set(userIds)); // Remove duplicates

        const usersPromises = uniqueUserIds.map(async (userId) => {
          const userData = await getUserById(userId); // Fetch user by ID
          return { id: userId, ...userData };
        });

        const usersData = await Promise.all(usersPromises);
        const usersMap: { [key: string]: User } = {};
        usersData.forEach((user) => {
          usersMap[user.id] = user; // Map users by their ID
        });
        setUsers(usersMap);
      } catch (error) {
        console.error('Error fetching trades or users', error);
        toast.error('Error fetching trades or users');
      }
    };

    fetchTradesAndUsers();
  }, []);

  const handleDecideTrade = async (tradeId: string, outcome: 'win' | 'lose') => {
    try {
      // Ensure both tradeId and outcome are passed correctly
      await decideTradeOutcome({ tradeId, outcome });
      const tradesData = await getAllTrades();
      setTrades(tradesData);
      toast.success('Trade updated successfully')
    } catch (error) {
      console.error('Error deciding trade outcome:', error);
      toast.error('Error updating trade')
    }
  };
  
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Trades</h1>
        <div className="overflow-x-auto bg-white text-black rounded-lg shadow-md">
          <table className="min-w-full">
            <thead>
              <tr className="bg-blue-600">
                <th className="py-2 px-4 text-left">User</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Asset</th>
                <th className="py-2 px-4 text-left">Capital</th>
                <th className="py-2 px-4 text-left">Return Rate</th>
                <th className="py-2 px-4 text-left">Leverage</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
  {trades.map((trade) => (
    <tr key={trade._id} className="border-b hover:bg-gray-100">
      <td className="py-2 px-4">
        {trade.user && typeof trade.user === 'object' && '_id' in trade.user
          ? users[trade.user._id] 
            ? users[trade.user._id].name 
            : 'Unknown User'
          : trade.user && users[trade.user] 
            ? users[trade.user].name 
            : 'Unknown User'}
      </td>
      <td className="py-2 px-4">
        {trade.user && typeof trade.user === 'object' && '_id' in trade.user
          ? users[trade.user._id] 
            ? users[trade.user._id].email 
            : 'No Email'
          : trade.user && users[trade.user] 
            ? users[trade.user].email 
            : 'No Email'}
      </td>
      <td className="py-2 px-4">{trade.assetId}</td>
      <td className="py-2 px-4">{trade.capital}</td>
      <td className="py-2 px-4">{trade.returnRate}</td>
      <td className="py-2 px-4">{trade.leverage}</td>
      <td className="py-2 px-4">{trade.status}</td>
      <td className="py-2 px-4">
        {trade.status === 'pending' && (
          <>
            <button
              className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
              onClick={() => handleDecideTrade(trade._id, 'win')}
            >
              Win
            </button>
            <button
              className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 ml-2"
              onClick={() => handleDecideTrade(trade._id, 'lose')}
            >
              Lose
            </button>
          </>
        )}
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminTrades;

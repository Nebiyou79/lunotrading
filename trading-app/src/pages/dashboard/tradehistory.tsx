import React, { useEffect, useState } from 'react';
import { getUserTradeHistory } from '../../utils/tradeService';
import Layout from '@/components/Layout';

interface Trade {
  _id: string;
  assetId: string;
  capital: number;
  returnRate: number;
  leverage: number;
  status: string;
  resultAmount: number; // Profit/Loss amount
  createdAt: string;
  duration: number;
}

const TradeHistory: React.FC = () => {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const tradeHistory = await getUserTradeHistory();
        setTrades(tradeHistory);
      } catch (error) {
        console.error('Error fetching trade history:', error);
      }
    };

    fetchTrades();
  }, []);

  const calculateRemainingTime = (createdAt: string, duration: number) => {
    const tradeStartTime = new Date(createdAt).getTime();
    const currentTime = Date.now();
    const elapsedTime = (currentTime - tradeStartTime) / 1000; // Time elapsed in seconds
    return Math.max(duration - elapsedTime, 0); // Remaining time (non-negative)
  };

  return (
    <Layout>
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg space-y-6 text-white">
        <h2 className="text-3xl font-bold mb-6 text-blue-500">Trade History</h2>
        <table className="min-w-full text-center text-gray-300">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-4">Asset</th>
              <th className="p-4">Capital</th>
              <th className="p-4">Return Rate</th>
              <th className="p-4">Leverage</th>
              <th className="p-4">Status</th>
              <th className="p-4">Profit/Loss</th>
              <th className="p-4">Time Left</th>
            </tr>
          </thead>
          <tbody className="bg-gray-700 divide-y divide-gray-600">
            {trades.map((trade: Trade) => {
              const remainingTime = calculateRemainingTime(trade.createdAt, trade.duration);
              const statusColor = trade.status === 'win'
                ? 'text-green-500'
                : trade.status === 'lose'
                ? 'text-red-500'
                : 'text-gray-500';
              const profitLoss = trade.status === 'pending'
                ? 0
                : trade.resultAmount;

              return (
                <tr key={trade._id}>
                  <td className="p-4">{trade.assetId}</td>
                  <td className="p-4">{trade.capital} USDT</td>
                  <td className="p-4">{trade.returnRate}% USDT</td>
                  <td className="p-4">{trade.leverage}x</td>
                  <td className="p-4">{trade.status}</td>
                  <td className={`p-4 font-semibold ${statusColor}`}>
                    {profitLoss >= 0 
                      ? `+${profitLoss.toFixed(2)} USDT` 
                      : `-${Math.abs(profitLoss).toFixed(2)} USDT`}
                  </td>
                  <td className="p-4">
                    {remainingTime > 0 ? `${Math.floor(remainingTime)}s` : 'Expired'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default TradeHistory;

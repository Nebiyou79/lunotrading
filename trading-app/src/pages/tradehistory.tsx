import React, { useEffect, useState } from 'react';
import { getUserTradeHistory } from '../utils/tradeService';
import NavBar from '@/components/navbar';

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

        if (Array.isArray(tradeHistory)) {
          setTrades(tradeHistory.filter((trade) => trade && trade._id));
        } else {
          console.error('Invalid trade history response:', tradeHistory);
        }
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
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg text-white w-full">
      <NavBar/>
      <h2 className="text-2xl font-bold mb-6 text-blue-500 text-center">Trade History</h2>

      {trades.length > 0 ? (
        <table className="min-w-full bg-gray-800 rounded-lg">
          <thead>
            <tr className="text-left border-b border-gray-700">
              <th className="p-4 font-semibold text-gray-300">Asset</th>
              <th className="p-4 font-semibold text-gray-300">Capital (USDT)</th>
              <th className="p-4 font-semibold text-gray-300">Return Rate (%)</th>
              <th className="p-4 font-semibold text-gray-300">Leverage</th>
              <th className="p-4 font-semibold text-gray-300">Status</th>
              <th className="p-4 font-semibold text-gray-300">Profit/Loss (USDT)</th>
              <th className="p-4 font-semibold text-gray-300">Time Left</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade: Trade) => {
              const remainingTime = calculateRemainingTime(trade.createdAt, trade.duration);

              const statusColor =
                trade.status === 'win'
                  ? 'text-green-500'
                  : trade.status === 'lose'
                  ? 'text-red-500'
                  : 'text-gray-500';

              const profitLossAmount = trade.resultAmount || 0;
              const profitLoss =
                trade.status === 'win'
                  ? `+${profitLossAmount.toFixed(2)}`
                  : trade.status === 'lose'
                  ? `-${Math.abs(profitLossAmount).toFixed(2)}`
                  : '0.00';

              return (
                <tr key={trade._id} className="hover:bg-gray-700 transition duration-150 ease-in-out">
                  <td className="p-4">{trade.assetId}</td>
                  <td className="p-4">{trade.capital} USDT</td>
                  <td className="p-4">{trade.returnRate}%</td>
                  <td className="p-4">{trade.leverage}x</td>
                  <td className={`p-4 ${statusColor}`}>{trade.status}</td>
                  <td className={`p-4 font-bold ${statusColor}`}>{profitLoss}</td>
                  <td className="p-4">
                    {remainingTime > 0 ? `${Math.floor(remainingTime)}s` : 'Expired'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-400">No trade history available.</p>
      )}
    </div>
  );
};

export default TradeHistory;

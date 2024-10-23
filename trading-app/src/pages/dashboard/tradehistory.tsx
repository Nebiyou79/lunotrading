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
    <Layout>
      <div className="bg-gray-900 p-4 rounded-xl shadow-lg space-y-4 text-white">
        <h2 className="text-2xl font-bold mb-4 text-blue-500">Trade History</h2>

        {/* Wrapping the table inside a scrollable div */}
        {trades.length > 0 ? (
          <div className="overflow-x-auto max-w-full">
            <table className="table-auto w-full text-center text-gray-300">
              <thead className="bg-gray-800">
                <tr>
                  <th className="p-3">Asset</th>
                  <th className="p-3">Capital</th>
                  <th className="p-3">Return Rate</th>
                  <th className="p-3">Leverage</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Profit/Loss</th>
                  <th className="p-3">Time Left</th>
                </tr>
              </thead>
              <tbody className="bg-gray-700 divide-y divide-gray-600">
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
                    <tr key={trade._id}>
                      <td className="p-3">{trade.assetId}</td>
                      <td className="p-3">{trade.capital} USDT</td>
                      <td className="p-3">{trade.returnRate}%</td>
                      <td className="p-3">{trade.leverage}x</td>
                      <td className="p-3">{trade.status}</td>
                      <td className={`p-3 font-semibold ${statusColor}`}>{profitLoss} USDT</td>
                      <td className="p-3">{remainingTime > 0 ? `${Math.floor(remainingTime)}s` : 'Expired'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No trade history available.</p>
        )}
      </div>
    </Layout>
  );
};

export default TradeHistory;

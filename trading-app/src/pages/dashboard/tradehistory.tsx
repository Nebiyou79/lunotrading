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
      <div className="bg-gray-900 p-4 rounded-xl shadow-lg text-white w-full">
        <h2 className="text-2xl font-bold mb-6 text-blue-500 text-center">Trade History</h2>

        {trades.length > 0 ? (
          <div className="w-full flex flex-col space-y-4">
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
                <div
                  key={trade._id}
                  className="flex flex-wrap bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
                >
                  <div className="flex-1 sm:w-1/6 text-left">
                    <span className="block font-semibold text-gray-300 mb-1">Asset</span>
                    <span className="text-lg">{trade.assetId}</span>
                  </div>
                  <div className="flex-1 sm:w-1/6 text-left">
                    <span className="block font-semibold text-gray-300 mb-1">Capital</span>
                    <span className="text-lg">{trade.capital} USDT</span>
                  </div>
                  <div className="flex-1 sm:w-1/6 text-left">
                    <span className="block font-semibold text-gray-300 mb-1">Return Rate</span>
                    <span className="text-lg">{trade.returnRate}%</span>
                  </div>
                  <div className="flex-1 sm:w-1/6 text-left">
                    <span className="block font-semibold text-gray-300 mb-1">Leverage</span>
                    <span className="text-lg">{trade.leverage}x</span>
                  </div>
                  <div className="flex-1 sm:w-1/6 text-left">
                    <span className="block font-semibold text-gray-300 mb-1">Status</span>
                    <span className={`text-lg ${statusColor}`}>{trade.status}</span>
                  </div>
                  <div className="flex-1 sm:w-1/6 text-left">
                    <span className="block font-semibold text-gray-300 mb-1">Profit/Loss</span>
                    <span className={`text-lg font-bold ${statusColor}`}>{profitLoss} USDT</span>
                  </div>
                  <div className="flex-1 sm:w-1/6 text-left">
                    <span className="block font-semibold text-gray-300 mb-1">Time Left</span>
                    <span className="text-lg">{remainingTime > 0 ? `${Math.floor(remainingTime)}s` : 'Expired'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center">No trade history available.</p>
        )}
      </div>
    </Layout>
  );
};

export default TradeHistory;

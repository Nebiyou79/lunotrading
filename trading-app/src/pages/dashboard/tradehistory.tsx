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
        <h2 className="text-2xl font-bold mb-4 text-blue-500">Trade History</h2>

        {/* Wrapping the trades inside a scrollable div */}
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
                  className="flex flex-wrap bg-gray-800 p-4 rounded-lg space-y-2 sm:space-y-0 justify-between items-center text-center"
                >
                  <div className="flex-1 sm:w-1/6">
                    <span className="font-semibold">Asset:</span> {trade.assetId}
                  </div>
                  <div className="flex-1 sm:w-1/6">
                    <span className="font-semibold">Capital:</span> {trade.capital} USDT
                  </div>
                  <div className="flex-1 sm:w-1/6">
                    <span className="font-semibold">Return Rate:</span> {trade.returnRate}%
                  </div>
                  <div className="flex-1 sm:w-1/6">
                    <span className="font-semibold">Leverage:</span> {trade.leverage}x
                  </div>
                  <div className="flex-1 sm:w-1/6">
                    <span className="font-semibold">Status:</span> {trade.status}
                  </div>
                  <div className={`flex-1 sm:w-1/6 font-semibold ${statusColor}`}>
                    <span className="font-semibold">Profit/Loss:</span> {profitLoss} USDT
                  </div>
                  <div className="flex-1 sm:w-1/6">
                    <span className="font-semibold">Time Left:</span> {remainingTime > 0 ? `${Math.floor(remainingTime)}s` : 'Expired'}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No trade history available.</p>
        )}
      </div>
    </Layout>
  );
};

export default TradeHistory;

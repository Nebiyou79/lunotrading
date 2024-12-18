import React, { useEffect, useState } from 'react';
import { getUserTradeHistory } from '../utils/tradeService';
import NavBar from '@/components/navbar';

interface Trade {
  _id: string;
  assetId: string;
  capital: number;
  returnRate: number;
  status: string;
  direction: string;
  resultAmount: number;
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
    const elapsedTime = (currentTime - tradeStartTime) / 1000;
    return Math.max(duration - elapsedTime, 0);
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg text-white w-full">
      <NavBar />
      <h2 className="text-2xl font-bold mb-6 text-blue-500 text-center">Trade History</h2>

      {trades.length > 0 ? (
        <div className="space-y-4">
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
                className="p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition duration-150 ease-in-out md:flex md:items-center md:justify-between"
              >
                <div className="text-lg font-bold text-blue-400 mb-2 md:mb-0">
                  {trade.assetId}
                </div>
                <div className="space-y-1 md:space-y-0 md:flex md:gap-4 md:items-center">
                  <div className="text-sm">
                    <span className="font-semibold text-gray-300">Capital:</span> {trade.capital} USDT
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold text-gray-300">Return Rate:</span> {trade.returnRate}%
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold text-gray-300">Return Rate:</span> {trade.direction}%
                  </div>
                  <div className={`text-sm font-semibold ${statusColor}`}>
                    <span className="text-gray-300">Status:</span> {trade.status}
                  </div>
                  <div className={`text-sm font-bold ${statusColor}`}>
                    <span className="text-gray-300">Profit/Loss:</span> {profitLoss} USDT
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold text-gray-300">Time Left:</span> {remainingTime > 0 ? `${Math.floor(remainingTime)}s` : 'Expired'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-400">No trade history available.</p>
      )}
    </div>
  );
};

export default TradeHistory;

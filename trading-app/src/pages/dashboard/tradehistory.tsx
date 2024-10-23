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
    const elapsedTime = currentTime - tradeStartTime;
    const remainingTime = Math.max(0, duration - Math.floor(elapsedTime / 1000));
    return remainingTime;
  };

  return (
    <Layout>
      <div className="p-4 md:p-8 space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-500 mb-4">Trade History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left bg-gray-900 text-white shadow-lg rounded-xl">
            <thead>
              <tr className="bg-gray-700">
                <th className="py-3 px-4">Coin</th>
                <th className="py-3 px-4">Capital</th>
                <th className="py-3 px-4">Return Rate</th>
                <th className="py-3 px-4">Leverage</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Result</th>
                <th className="py-3 px-4">Time Left</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {trades.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-4 px-6 text-center">
                    No trades available.
                  </td>
                </tr>
              ) : (
                trades.map((trade) => (
                  <tr key={trade._id} className="border-b border-gray-700">
                    <td className="py-3 px-4">{trade.assetId}</td>
                    <td className="py-3 px-4">${trade.capital}</td>
                    <td className="py-3 px-4">{trade.returnRate}%</td>
                    <td className="py-3 px-4">x{trade.leverage}</td>
                    <td className="py-3 px-4">
                      <span className={`py-1 px-2 rounded ${trade.status === 'win' ? 'bg-green-500' : 'bg-red-500'}`}>
                        {trade.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">${trade.resultAmount}</td>
                    <td className="py-3 px-4">
                      {calculateRemainingTime(trade.createdAt, trade.duration)}s
                    </td>
                    <td className="py-3 px-4">{new Date(trade.createdAt).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default TradeHistory;

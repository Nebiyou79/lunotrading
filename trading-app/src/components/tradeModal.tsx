import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { placeTrade } from '@/utils/tradeService';
import { toast } from 'react-toastify';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#1A1A1D',
    color: 'white',
    borderRadius: '10px',
    padding: '20px',
    width: '80%',
    maxHeight: '80vh',
  },
};

Modal.setAppElement('#__next');

interface TradingModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  amountBTCUSD: number;
  coinName: string | null;
  balance: number;
}

const TradingModal: React.FC<TradingModalProps> = ({ isOpen, onRequestClose, amountBTCUSD, coinName, balance }) => {
  const [newBalance, setNewBalance] = useState(balance);
  const [capital, setCapital] = useState<number>(100);
  const [returnRate, setReturnRate] = useState<number>(12);
  const [leverage, setLeverage] = useState<number>(1);
  const [expectedReturn, setExpectedReturn] = useState<number>(0);
  const [transactionFee, setTransactionFee] = useState<number>(0);
  const [duration, setDuration] = useState<number>(30);

  const minimumCapitalRequirements: { [key: number]: number } = {
    30: 0, // No minimum for 30s trades
    60: 10000, // 10,000 USDT for 60s trades
    90: 80000, // 80,000 USDT for 90s trades
    180: 150000, // 150,000 USDT for 180s trades
    300: 300000, // 300,000 USDT for 300s trades
  };

  useEffect(() => {
    const returnAmount = (capital * returnRate * leverage) / 100;
    const fee = capital * 0.02;
    setExpectedReturn(returnAmount);
    setTransactionFee(fee);
  }, [capital, returnRate, leverage]);

  const validateBalance = () => {
    const minCapital = minimumCapitalRequirements[duration];
    return newBalance >= minCapital;
  };

  const handleConfirmTrade = async () => {
    if (!validateBalance()) {
      toast.error(`Insufficient balance for ${duration}s trade. Minimum required is ${minimumCapitalRequirements[duration]} USDT.`);
      return;
    }

    try {
      const tradeData = {
        assetId: coinName,
        capital,
        returnRate,
        leverage,
        duration,
        transactionFee,
      };

      const response = await placeTrade(tradeData);
      if (response?.updatedBalance !== undefined) {
        setNewBalance(response.updatedBalance); // Update the balance after trade
      }

      toast.success('Trade placed successfully!');
      onRequestClose(); // Close modal on success
    } catch (error) {
      console.error('Error placing trade:', error);
      toast.error('Insufficient balance!');
    }
  };

  const returnRates = [
    { time: '30s', rate: 12, duration: 30, color: 'bg-blue-500' },
    { time: '60s', rate: 18, duration: 60, color: 'bg-green-500' },
    { time: '90s', rate: 25, duration: 90, color: 'bg-yellow-500' },
    { time: '180s', rate: 32, duration: 180, color: 'bg-orange-500' },
    { time: '300s', rate: 45, duration: 300, color: 'bg-red-500' },
  ];

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles} contentLabel="Trade Confirmation">
      <div className="overflow-y-auto max-h-[70vh]">
        <h2 className="text-3xl font-bold mb-4 text-center">Confirm Your Trade</h2>
        <p className="text-lg">Amount {coinName}: {amountBTCUSD}</p>

        <div className="mt-4">
          <label className="block mb-2 text-lg">Capital (USDT):</label>
          <input
            type="number"
            value={capital || ''}
            onChange={(e) => setCapital(e.target.value === '' ? 0 : Number(e.target.value))}
            className="w-full p-2 text-black rounded"
          />
        </div>

        <div className="mt-4">
          <label className="block mb-2 text-lg">Return Rate:</label>
          <div className="grid grid-cols-3 gap-2">
            {returnRates.map((rate) => (
              <button
                key={rate.rate}
                onClick={() => {
                  setReturnRate(rate.rate);
                  setDuration(rate.duration);
                }}
                className={`py-2 px-4 rounded text-white ${rate.color} ${returnRate === rate.rate ? 'ring-4 ring-white' : ''}`}
              >
                {rate.time} - {rate.rate}%
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <label className="block mb-2 text-lg">Leverage:</label>
          <input
            type="number"
            value={leverage}
            onChange={(e) => setLeverage(Number(e.target.value))}
            className="w-full p-2 text-black rounded"
            min={1}
            max={5}
          />
        </div>

        <div className="mt-6 text-lg grid grid-cols-1 gap-4">
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg shadow-lg">
            <div className="flex items-center">
              <span className="text-gray-300">Available Amount:</span>
            </div>
            <span className="text-white font-bold">{newBalance} USDT</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg shadow-lg">
            <div className="flex items-center">
              <span className="text-gray-300">Expected Return:</span>
            </div>
            <span className="text-green-400 font-bold">{expectedReturn.toFixed(2)} USDT</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg shadow-lg">
            <div className="flex items-center">
              <span className="text-gray-300">Transaction Fee:</span>
            </div>
            <span className="text-red-400 font-bold">{transactionFee.toFixed(2)} USDT</span>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button className="bg-red-500 text-white py-2 px-4 rounded mr-2 hover:bg-red-600" onClick={onRequestClose}>
            Cancel
          </button>
          <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600" onClick={handleConfirmTrade}>
            Confirm Trade
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TradingModal;

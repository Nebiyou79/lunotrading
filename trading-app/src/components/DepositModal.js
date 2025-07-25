import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { getDepositAddresses } from '../utils/depositService';
import apiService from '../utils/fundsService';
import { toast } from 'react-toastify';

const DepositModal = ({ showDepositModal, setShowDepositModal, token }) => {
  const [addresses, setAddresses] = useState({
    usdtAddress: '',
    btcAddress: '',
    ethAddress: ''
  });
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USDT');
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAddresses = async () => {
      if (!token) return;
      try {
        const response = await getDepositAddresses(token);
        if (response.data) {
          setAddresses({
            ethAddress: response.data.ethAddress || '',
            btcAddress: response.data.btcAddress || '',
            usdtAddress: response.data.usdtAddress || '',
          });
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Error fetching deposit addresses');
        toast.error('Error fetching deposit addresses.');
      }
    };
    fetchAddresses();
  }, [token]);

  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleDepositSubmit = async () => {
    setMessage('');
    setError('');

    if (!selectedFile) {
      setError('Please upload proof of payment.');
      return;
    }

    if (!amount || isNaN(amount) || amount <= 0) {
      setError('Please enter a valid deposit amount.');
      return;
    }

    const formData = new FormData();
    formData.append('proof', selectedFile);
    formData.append('amount', amount);
    formData.append('currency', currency);

    try {
      const response = await apiService.deposit(formData, token);
      setMessage(`Deposit request submitted successfully: ${response.message}`);
      toast.success(`Deposit request submitted successfully: ${response.message}`);
    } catch (err) {
      console.error(err);
      setError('Failed to submit deposit request.');
      toast.error('Failed to submit deposit request.');
    }
  };

  const copyToClipboard = (address) => {
    if (!address) {
      setError('Address not available to copy.');
      toast.error('Address not available to copy.');
      return;
    }
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      navigator.clipboard.writeText(address)
        .then(() => {
          setMessage('Address copied to clipboard.');
          toast.success('Address copied to clipboard.');
        })
        .catch(() => {
          setError('Failed to copy address.');
          toast.error('Failed to copy address.');
        });
    } else {
      setError('Clipboard functionality is not available in your environment.');
      toast.error('Clipboard functionality is not available.');
    }
  };

  return (
    <>
      {showDepositModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-3xl md:w-11/12 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl mb-4 text-center text-white">Deposit Addresses</h2>

            {/* Deposit Options for Smaller Screens */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
              {/* ETH */}
              <div className="flex flex-col items-center">
                <p>ETH</p>
                <QRCodeCanvas value={addresses.ethAddress} />
                <p className="break-all text-sm md:text-base">{addresses.ethAddress}</p>
                <button
                  className="mt-2 bg-gray-700 hover:bg-gray-600 text-white py-1 px-2 rounded"
                  onClick={() => copyToClipboard(addresses.ethAddress)}
                >
                  Copy Address
                </button>
              </div>

              {/* BTC */}
              <div className="flex flex-col items-center">
                <p>BTC</p>
                <QRCodeCanvas value={addresses.btcAddress} />
                <p className="break-all text-sm md:text-base">{addresses.btcAddress}</p>
                <button
                  className="mt-2 bg-gray-700 hover:bg-gray-600 text-white py-1 px-2 rounded"
                  onClick={() => copyToClipboard(addresses.btcAddress)}
                >
                  Copy Address
                </button>
              </div>

              {/* USDT */}
              <div className="flex flex-col items-center">
                <p>USDT:</p>
                <QRCodeCanvas value={addresses.usdtAddress} />
                <p className="break-all text-sm md:text-base">{addresses.usdtAddress}</p>
                <button
                  className="mt-2 bg-gray-700 hover:bg-gray-600 text-white py-1 px-2 rounded"
                  onClick={() => copyToClipboard(addresses.usdtAddress)}
                >
                  Copy Address
                </button>
              </div>
            </div>

            {/* Input for Amount */}
            <div className="mb-4">
              <label className="block mb-2 text-white">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white"
                placeholder="Enter amount"
                required
              />
            </div>

            {/* Input for Currency */}
            <div className="mb-4">
              <label className="block mb-2 text-white">Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
              >
                <option value="USDT">USDT</option>
                <option value="BTC">BTC</option>
                <option value="ETH">ETH</option>
              </select>
            </div>

            {/* Upload Proof of Payment */}
            <div className="text-center mb-4">
              <label className="block mb-2 text-white">Upload Proof of Payment:</label>
              <input type="file" className="text-white" onChange={handleFileUpload} />
            </div>

            {message && <p className="text-green-500">{message}</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="flex justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                onClick={handleDepositSubmit}
              >
                Submit
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                onClick={() => setShowDepositModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DepositModal;

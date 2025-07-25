/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { getUserProfile } from '../../utils/apiServices'; // Make sure this is correctly pointing to your API service file
import WithdrawModal from '../../components/WithdrawModal';
import DepositModal from '@/components/DepositModal';
import Layout from '@/components/Layout';
import { getUserTradeHistory } from '../../utils/tradeService';

const Profile = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);  // Allow error to be a string or null
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [dailyProfitLoss, setDailyProfitLoss] = useState<number>(0); 
  const [token, setToken] = useState('');

  // Fetch token from cookies or local storage
 React.useEffect(() => {
  // Assuming you're storing the token in local storage or cookies
  const fetchedToken = localStorage.getItem('token'); // or get it from cookies
  if (fetchedToken) {
    setToken(fetchedToken);
  }
}, []);


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setUser(data.user); // Assuming the API returns user data inside the "user" key
        setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Failed to fetch profile');
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);
   // Fetch profile and trade history
   useEffect(() => {
    const fetchProfileAndTrades = async () => {
      try {
        const profileData = await getUserProfile();
        setUser(profileData.user);

        const tradeHistory = await getUserTradeHistory();
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

        // Calculate daily profit/loss
        const todayTrades = tradeHistory.filter((trade: { createdAt: string | number | Date; }) => new Date(trade.createdAt).toISOString().split('T')[0] === today);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const dailyProfitLoss = todayTrades.reduce((total: any, trade: { status: string; resultAmount: number; }) => total + (trade.status === 'win' ? trade.resultAmount : -trade.resultAmount), 0);

        setDailyProfitLoss(dailyProfitLoss);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch profile or trade history');
        setLoading(false);
      }
    };
    fetchProfileAndTrades();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Layout>
    <div className="space-y-6">
      {/* Profile Info */}
      {user && ( // Conditionally render user details only if user is not null
        <div className="bg-gray-900 p-4 md:p-8 rounded-xl shadow-lg space-y-6 text-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-500 flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 10-9 0 4.5 4.5 0 009 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14.25v5.25M15.75 19.5h-7.5" />
          </svg>
          <span>Profile</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-400">Full Name:</p>
            <p className="text-lg font-semibold">{user.name}</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-400">Email:</p>
            <p className="text-lg font-semibold">{user.email}</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-400">Balance:</p>
            <p className="text-lg font-semibold">${user.balance}</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-400">KYC Status:</p>
            <p className={`text-lg font-semibold ${user.kycStatus === 'verified' ? 'text-green-500' : 'text-red-500'}`}>
              {user.kycStatus}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-400">Daily Profit/Loss:</p>
            <p className={`text-lg font-semibold ${dailyProfitLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {dailyProfitLoss >= 0 ? `+${dailyProfitLoss.toFixed(2)} USDT` : `${dailyProfitLoss.toFixed(2)} USDT`}
            </p>
          </div>
        </div>
      </div>
    )}

    <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-4">
      <button
        className="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
        onClick={() => setShowDepositModal(true)}
      >
        Deposit
      </button>
      <button
        onClick={() => setShowWithdrawalModal(true)}
        className="w-full sm:w-auto bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
      >
        Withdraw Funds
      </button>
    </div>

    {/* Modals */}
    <DepositModal showDepositModal={showDepositModal} setShowDepositModal={setShowDepositModal} token={token} />
    <WithdrawModal showWithdrawalModal={showWithdrawalModal} setShowWithdrawalModal={setShowWithdrawalModal} token={token} />
  
    </div>
    </Layout>
  );
};

export default Profile;

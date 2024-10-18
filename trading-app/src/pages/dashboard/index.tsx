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
        <div className="bg-gray-900 p-8 rounded-xl shadow-lg space-y-6 text-white">
  <h2 className="text-3xl font-bold mb-6 text-blue-500 flex items-center space-x-2">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 10-9 0 4.5 4.5 0 009 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14.25v5.25M15.75 19.5h-7.5" />
    </svg>
    <span>Profile</span>
  </h2>
  <div className="grid grid-cols-2 gap-4">
    <div className="space-y-1">
      <p className="text-sm font-medium text-gray-400 flex items-center">
        <span className="mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9.75h-7.5m7.5 4.5h-7.5m3.75 7.5a9 9 0 100-18 9 9 0 000 18z" />
          </svg>
        </span>
        Full Name:
      </p>
      <p className="text-lg font-semibold">{user.name}</p>
    </div>

    <div className="space-y-1">
      <p className="text-sm font-medium text-gray-400 flex items-center">
        <span className="mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75v4.5a2.25 2.25 0 01-2.25 2.25H9.75a2.25 2.25 0 01-2.25-2.25v-4.5M12 8.25v-2.5M7.5 10.5h9" />
          </svg>
        </span>
        Email:
      </p>
      <p className="text-lg font-semibold">{user.email}</p>
    </div>

    <div className="space-y-1">
      <p className="text-sm font-medium text-gray-400 flex items-center">
        <span className="mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h7.5m-7.5 10.5h7.5M9 12.75h6M12 10.5h0" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 6.75h.008v.008H9.75V6.75zm4.5 0h.008v.008h-.008V6.75z" />
          </svg>
        </span>
        Balance:
      </p>
      <p className="text-lg font-semibold">${user.balance}</p>
    </div>

    <div className="space-y-1">
      <p className="text-sm font-medium text-gray-400 flex items-center">
        <span className="mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9.75v6.75m-3-3.75v3.75" />
          </svg>
        </span>
        KYC Status:
      </p>
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

      {/* Deposit & Withdrawal */}
      <div className="flex space-x-4">
        <button 
          className=" mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" 
          onClick={() => setShowDepositModal(true)}
        >
          Deposit
        </button>
      {/* Button to open Withdrawal Modal */}
      <button 
        onClick={() => setShowWithdrawalModal(true)} 
        className="mt-4 bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
      >
        Withdraw Funds
      </button>
      </div>
      {/* Deposit Modal */}
      <DepositModal
        showDepositModal={showDepositModal} // Pass the state for visibility
        setShowDepositModal={setShowDepositModal} // Function to close modal
        token={token} // Authentication token for API requests
      />
      {/* Withdrawal Modal */}
      <WithdrawModal 
        showWithdrawalModal={showWithdrawalModal} 
        setShowWithdrawalModal={setShowWithdrawalModal} 
        token={token} 
      />
    </div>
    </Layout>
  );
};

export default Profile;

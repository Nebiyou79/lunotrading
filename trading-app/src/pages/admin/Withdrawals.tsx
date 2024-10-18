/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { getPendingWithdrawals, approveWithdrawal, rejectWithdrawal } from '../../utils/adminApiServices';
import Sidebar from '../../components/admin/Sidebar'; // Assuming you have a Sidebar component
import { toast } from 'react-toastify';

const Withdrawals = () => {
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch pending withdrawals
  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const data = await getPendingWithdrawals();
        setWithdrawals(data as any);
        setLoading(false);
        toast.success('Success fetching withdrawals');
      } catch (error: any) {
        setError('Failed to fetch pending withdrawals');
        toast.success('Failed to fetch withdrawal');
        setLoading(false);
      }
    };

    fetchWithdrawals();
  }, []);

  // Approve Withdrawal
  const handleApprove = async (withdrawalId: string) => {
    try {
      await approveWithdrawal(withdrawalId);
      toast.success('Withdrawal approved successfully');
      setWithdrawals(withdrawals.filter((w: any) => w._id !== withdrawalId));
    } catch (error) {
      toast.error('Failed to approve withdrawal');
    }
  };

  // Reject Withdrawal
  const handleReject = async (withdrawalId: string) => {
    try {
      await rejectWithdrawal(withdrawalId);
      toast.success('Withdrawal rejected successfully');
      setWithdrawals(withdrawals.filter((w: any) => w._id !== withdrawalId));
    } catch (error) {
      toast.error('Failed to reject withdrawal');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Pending Withdrawals</h2>

        {/* Table */}
        {withdrawals.length === 0 ? (
          <p>No pending withdrawals</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Email</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Balance</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Amount</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Address</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {withdrawals.map((withdrawal: any) => (
                  <tr key={withdrawal._id} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-2 text-sm text-gray-700">{withdrawal.userId.email}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{withdrawal.userId.balance} USD</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{withdrawal.amount} USD</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{withdrawal.address}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleApprove(withdrawal._id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(withdrawal._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Withdrawals;

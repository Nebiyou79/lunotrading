/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { getPendingDeposits, approveDeposit, rejectDeposit } from '../../utils/adminApiServices';
import Sidebar from '../../components/admin/Sidebar'; // Assuming you have a Sidebar component
import { toast } from 'react-toastify';

const Deposits = () => {
  const [deposits, setDeposits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch pending deposits
  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const data = await getPendingDeposits();
        setDeposits(data as any);
        toast.success('Deposits fetched successfully');
        setLoading(false);
      } catch (error: any) {
        setError('Failed to fetch pending deposits');
        toast.error('Failed to fetch deposits');
        setLoading(false);
      }
    };

    fetchDeposits();
  }, []);

  // Approve Deposit
  const handleApprove = async (depositId: string) => {
    try {
      await approveDeposit(depositId);
      toast.success('Deposit approved successfully');
      setDeposits(deposits.filter((d: any) => d._id !== depositId));
    } catch (error) {
      toast.error('Failed to approve deposit');
    }
  };

  // Reject Deposit
  const handleReject = async (depositId: string) => {
    try {
      await rejectDeposit(depositId);
      toast.success('Deposit rejected successfully');
      setDeposits(deposits.filter((d: any) => d._id !== depositId));
    } catch (error) {
      toast.error('Failed to reject deposit');
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
        <h2 className="text-2xl font-bold mb-4">Pending Deposits</h2>

        {/* Table */}
        {deposits.length === 0 ? (
          <p>No pending deposits</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Email</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Balance</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Amount</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Proof of Payment</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {deposits.map((deposit: any) => (
                  <tr key={deposit._id} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-2 text-sm text-gray-700">{deposit.userId.email}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{deposit.userId.balance} USD</td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {deposit.amount} {deposit.currency}
                    </td>
                    <td className="px-4 py-2">
                      {deposit.proofFilePath ? (
                        <ul>
                          <li>
                            <a
                              href={`https://lunotrading.com/${deposit.proofFilePath.replace(/\\/g, '/')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              View Proof
                            </a>
                          </li>
                        </ul>
                      ) : (
                        <span className="text-sm text-gray-500">No proof uploaded</span>
                      )}
                    </td>
                    
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleApprove(deposit._id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(deposit._id)}
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

export default Deposits;

/* eslint-disable @typescript-eslint/no-unused-vars */
// KYCAdminPage.tsx
import React, { useEffect, useState } from 'react';
import { getKYCRequests, approveKYC, rejectKYC } from '../../utils/kycService';
import Sidebar from '@/components/admin/Sidebar';

interface KYCRequest {
  _id: string;
  name: string;
  email: string;
  status: string;
  kycDocuments: string[];
}

const KYCAdminPage: React.FC = () => {
  const [kycRequests, setKycRequests] = useState<KYCRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all KYC requests
  const fetchKYCRequests = async () => {
    try {
      setLoading(true);
      const data = await getKYCRequests();
      setKycRequests(data as KYCRequest[]); // Type assertion ensures data is KYCRequest[]
    } catch (err) {
      setError('Failed to load KYC requests');
    } finally {
      setLoading(false);
    }
  };

  // Approve a KYC request
  const handleApprove = async (kycId: string) => {
    try {
      await approveKYC(kycId);
      fetchKYCRequests(); // Refresh the list
    } catch (err) {
      setError('Failed to approve KYC');
    }
  };

  // Reject a KYC request
  const handleReject = async (kycId: string) => {
    try {
      await rejectKYC(kycId);
      fetchKYCRequests(); // Refresh the list
    } catch (err) {
      setError('Failed to reject KYC');
    }
  };

  // Fetch KYC requests on component mount
  useEffect(() => {
    fetchKYCRequests();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='flex'>
      <Sidebar/>
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">KYC Management</h1>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Documents
              </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {kycRequests.map((request) => (
            <tr key={request._id} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{request.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{request.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : request.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {request.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                  {request.kycDocuments.length > 0 ? (
                    <ul>
                      {request.kycDocuments.map((doc, index) => (
                        <li key={index}>
                          <a
                            href={`http://localhost:5000/${doc}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-500 hover:underline"
                          >
                            Document {index + 1}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-sm text-gray-500">No documents uploaded</span>
                  )}
                </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {request.status === 'pending' ? (
                  <div className="space-x-4">
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      onClick={() => handleApprove(request._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleReject(request._id)}
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <span className="text-sm text-gray-500">{request.status}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default KYCAdminPage;

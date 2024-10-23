import React from 'react';
import Link from 'next/link';
import { FaUser, FaIdCard, FaEdit, FaHistory, FaHeadset } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div>
      {/* Mobile View */}
      <div className="md:hidden bg-gray-800 p-4 flex flex-col space-y-4">
        <Link href="/dashboard" className="flex items-center p-3 rounded-lg bg-gray-700 hover:bg-blue-600 transition duration-300">
          <FaUser className="text-white text-2xl" />
        </Link>
        <Link href="/dashboard/kyc" className="flex items-center p-3 rounded-lg bg-gray-700 hover:bg-blue-600 transition duration-300">
          <FaIdCard className="text-white text-2xl" />
        </Link>
        <Link href="/dashboard/updateProfile" className="flex items-center p-3 rounded-lg bg-gray-700 hover:bg-blue-600 transition duration-300">
          <FaEdit className="text-white text-2xl" />
        </Link>
        <Link href="/dashboard/tradehistory" className="flex items-center p-3 rounded-lg bg-gray-700 hover:bg-blue-600 transition duration-300">
          <FaHistory className="text-white text-2xl" />
        </Link>
        <Link href="/dashboard/customerSupport" className="flex items-center p-3 rounded-lg bg-gray-700 hover:bg-blue-600 transition duration-300">
          <FaHeadset className="text-white text-2xl" />
        </Link>
      </div>

      {/* Desktop View (Full Sidebar) */}
      <div className="hidden md:flex flex-col items-center p-6 bg-gradient-to-b from-blue-900 to-gray-900 min-h-screen w-20">
        <Link href="/dashboard">
          <FaUser className="text-white text-3xl mb-6 hover:text-blue-400 transition" />
          <h1>User Profile</h1>
        </Link>
        <Link href="/dashboard/kyc">
          <FaIdCard className="text-white text-3xl mb-6 hover:text-blue-400 transition" />
          <h1>KYC Verification</h1>
        </Link>
        <Link href="/dashboard/updateProfile">
          <FaEdit className="text-white text-3xl mb-6 hover:text-blue-400 transition" />
          <h1>Update Profile</h1>
        </Link>
        <Link href="/dashboard/tradehistory">
          <FaHistory className="text-white text-3xl mb-6 hover:text-blue-400 transition" />
          <h1>Trade History</h1>
        </Link>
        <Link href="/dashboard/customerSupport">
          <FaHeadset className="text-white text-3xl hover:text-blue-400 transition" />
          <h1>Customer Support</h1>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

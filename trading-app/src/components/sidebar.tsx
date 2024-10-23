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
      <div className="hidden md:flex flex-col p-6 bg-gradient-to-b from-blue-900 to-gray-900 min-h-screen w-40">
        <Link href="/dashboard" className="flex items-center mb-6 hover:text-blue-400 transition">
          <FaUser className="text-white text-3xl mr-3" />
          <span className="text-white">User Profile</span>
        </Link>
        <Link href="/dashboard/kyc" className="flex items-center mb-6 hover:text-blue-400 transition">
          <FaIdCard className="text-white text-3xl mr-3" />
          <span className="text-white">KYC Verification</span>
        </Link>
        <Link href="/dashboard/updateProfile" className="flex items-center mb-6 hover:text-blue-400 transition">
          <FaEdit className="text-white text-3xl mr-3" />
          <span className="text-white">Update Profile</span>
        </Link>
        <Link href="/dashboard/tradehistory" className="flex items-center mb-6 hover:text-blue-400 transition">
          <FaHistory className="text-white text-3xl mr-3" />
          <span className="text-white">Trade History</span>
        </Link>
        <Link href="/dashboard/customerSupport" className="flex items-center hover:text-blue-400 transition">
          <FaHeadset className="text-white text-3xl mr-3" />
          <span className="text-white">Customer Support</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

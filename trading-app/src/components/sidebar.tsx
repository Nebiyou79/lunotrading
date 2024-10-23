import React from 'react';
import Link from 'next/link';
import { FaUser, FaIdCard, FaEdit, FaHistory, FaHeadset } from 'react-icons/fa';

const Sidebar = () => {

  return (
    <div>
      <div className="md:hidden bg-gray-800 p-2 flex justify-between items-center">
        <div className="p-4 space-y-6">
          <Link href="/dashboard">
            <FaUser className="text-white text-2xl" />
          </Link>
          <Link href="/dashboard/kyc">
            <FaIdCard className="text-white text-2xl" />
          </Link>
          <Link href="/dashboard/updateProfile">
            <FaEdit className="text-white text-2xl" />
          </Link>
          <Link href="/dashboard/tradehistory">
            <FaHistory className="text-white text-2xl" />
          </Link>
          <Link href="/dashboard/customerSupport">
            <FaHeadset className="text-white text-2xl" />
          </Link>
        </div>
      </div>

      {/* Desktop View (Full Sidebar) */}
      <div className="hidden md:flex flex-col items-center p-6 bg-gradient-to-b from-blue-900 to-gray-900 min-h-screen w-20">
        <Link href="/dashboard">
          <FaUser className="text-white text-3xl mb-6 hover:text-blue-400 transition" />
        </Link>
        <Link href="/dashboard/kyc">
          <FaIdCard className="text-white text-3xl mb-6 hover:text-blue-400 transition" />
        </Link>
        <Link href="/dashboard/updateProfile">
          <FaEdit className="text-white text-3xl mb-6 hover:text-blue-400 transition" />
        </Link>
        <Link href="/dashboard/tradehistory">
          <FaHistory className="text-white text-3xl mb-6 hover:text-blue-400 transition" />
        </Link>
        <Link href="/dashboard/customerSupport">
          <FaHeadset className="text-white text-3xl hover:text-blue-400 transition" />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

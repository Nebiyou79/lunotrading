import React from 'react';
import Link from 'next/link';
import { FaUser, FaIdCard, FaEdit, FaHistory, FaHeadset } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div>
      {/* Mobile View (Icons only) */}
      <div className="md:hidden bg-gray-800 flex justify-around p-3">
        <Link href="/dashboard">
          <FaUser className="text-white text-2xl hover:text-blue-400 transition" />
        </Link>
        <Link href="/dashboard/kyc">
          <FaIdCard className="text-white text-2xl hover:text-blue-400 transition" />
        </Link>
        <Link href="/dashboard/updateProfile">
          <FaEdit className="text-white text-2xl hover:text-blue-400 transition" />
        </Link>
        <Link href="/dashboard/tradehistory">
          <FaHistory className="text-white text-2xl hover:text-blue-400 transition" />
        </Link>
        <Link href="/dashboard/customerSupport">
          <FaHeadset className="text-white text-2xl hover:text-blue-400 transition" />
        </Link>
      </div>

      {/* Desktop View (Full Sidebar) */}
      <div className="hidden md:block p-6 bg-gradient-to-b from-blue-900 to-gray-900 min-h-screen">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-white">Personal Center</h2>
        </div>
        <nav className="space-y-4">
          <Link href="/dashboard" className="block py-3 px-5 rounded hover:bg-blue-700 text-white transition">
            Profile
          </Link>
          <Link href="/dashboard/kyc" className="block py-3 px-5 rounded hover:bg-blue-700 text-white transition">
            KYC Verification
          </Link>
          <Link href="/dashboard/updateProfile" className="block py-3 px-5 rounded hover:bg-blue-700 text-white transition">
            Update Profile
          </Link>
          <Link href="/dashboard/tradehistory" className="block py-3 px-5 rounded hover:bg-blue-700 text-white transition">
            Trade History
          </Link>
          <Link href="/dashboard/customerSupport" className="block py-3 px-5 rounded hover:bg-blue-700 text-white transition">
            Customer Support
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

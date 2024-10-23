import React from 'react';
import Link from 'next/link';
import { FaUser, FaIdCard, FaEdit, FaHistory, FaHeadset } from 'react-icons/fa';

const Sidebar = () => {

  return (
    <div>
      {/* Mobile View (Icons only) */}
      <div className="md:hidden bg-gray-800 flex justify-around p-2">
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

      {/* Desktop View (Full Sidebar) */}
      <div className="hidden md:block p-6 bg-gray-800">
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-white">Personal Center</h2>
        </div>
        <nav className="space-y-4">
          <Link href="/dashboard" className="block py-2.5 px-4 rounded transition hover:bg-gray-700 text-white">
            Profile
          </Link>
          <Link href="/dashboard/kyc" className="block py-2.5 px-4 rounded transition hover:bg-gray-700 text-white">
            KYC Verification
          </Link>
          <Link href="/dashboard/updateProfile" className="block py-2.5 px-4 rounded transition hover:bg-gray-700 text-white">
            Update Profile
          </Link>
          <Link href="/dashboard/tradehistory" className="block py-2.5 px-4 rounded transition hover:bg-gray-700 text-white">
            Trade History
          </Link>
          <Link href="/dashboard/customerSupport" className="block py-2.5 px-4 rounded transition hover:bg-gray-700 text-white">
            Customer Support
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

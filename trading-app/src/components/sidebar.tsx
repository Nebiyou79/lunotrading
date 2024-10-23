import React, { useState } from 'react';
import Link from 'next/link';
import { FaUser, FaIdCard, FaEdit, FaHistory, FaHeadset } from 'react-icons/fa';

const Sidebar = () => {
  // Hook for mobile view toggle
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:w-64 bg-gray-800 p-6">
      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold">Personal Center</h2>
        </div>
        <nav className="space-y-4">
          <Link href="/dashboard" className="block py-2.5 px-4 rounded transition hover:bg-gray-700">
            Profile
          </Link>
          <Link href="/dashboard/kyc" className="block py-2.5 px-4 rounded transition hover:bg-gray-700">
            KYC Verification
          </Link>
          <Link href="/dashboard/updateProfile" className="block py-2.5 px-4 rounded transition hover:bg-gray-700">
            Update Profile
          </Link>
          <Link href="/dashboard/tradehistory" className="block py-2.5 px-4 rounded transition hover:bg-gray-700">
            Trade History
          </Link>
          <Link href="/dashboard/customerSupport" className="block py-2.5 px-4 rounded transition hover:bg-gray-700">
            Customer Support
          </Link>
        </nav>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            ☰
          </button>
        </div>

        {isOpen && (
          <nav className="space-y-4">
            <Link href="/dashboard" className="flex items-center py-2 px-3 rounded transition hover:bg-gray-700">
              <FaUser className="mr-2" /> Profile
            </Link>
            <Link href="/dashboard/kyc" className="flex items-center py-2 px-3 rounded transition hover:bg-gray-700">
              <FaIdCard className="mr-2" /> KYC Verification
            </Link>
            <Link href="/dashboard/updateProfile" className="flex items-center py-2 px-3 rounded transition hover:bg-gray-700">
              <FaEdit className="mr-2" /> Update Profile
            </Link>
            <Link href="/dashboard/tradehistory" className="flex items-center py-2 px-3 rounded transition hover:bg-gray-700">
              <FaHistory className="mr-2" /> Trade History
            </Link>
            <Link href="/dashboard/customerSupport" className="flex items-center py-2 px-3 rounded transition hover:bg-gray-700">
              <FaHeadset className="mr-2" /> Customer Support
            </Link>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

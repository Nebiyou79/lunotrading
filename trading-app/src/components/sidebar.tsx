import React, { useState } from 'react';
import Link from 'next/link';
import { FaUser, FaIdCard, FaEdit, FaHistory, FaHeadset } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle sidebar for mobile view
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Mobile View (Hamburger Menu) */}
      <div className="md:hidden bg-gray-800 p-2 flex justify-between items-center">
        <div className="text-white text-xl">Luno Trading</div>
        <GiHamburgerMenu
          className="text-white text-3xl cursor-pointer"
          onClick={toggleSidebar}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-20 transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-gray-800 md:hidden`}
      >
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

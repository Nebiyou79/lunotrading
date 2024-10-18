import Link from 'next/link';
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image'; 
import { isAuthenticated, logout } from '@/utils/auth'; // Ensure this path is correct

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState('');

  // Only run this effect on the client-side
  useEffect(() => {
    const authData = isAuthenticated();
    setLoggedIn(authData.loggedIn);
    setRole(authData.role);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
  }, []);

  return (
    <nav className="sticky top-0 bg-gradient-to-r from-blue-500 to-purple-600 p-4 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Image src="/images/logo.png" alt="Company Logo" width={40} height={40} />
          <span className="text-white text-2xl font-bold">Luno Trading</span>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <ul className={`md:flex space-x-6 ${isOpen ? 'block' : 'hidden'} md:block`}>
          <li>
            <Link href="/" className="text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition-all duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/markets" className="text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition-all duration-300">
              Markets
            </Link>
          </li>
          {loggedIn ? (
            <>
              <li>
                <Link href="/dashboard" className="text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition-all duration-300">
                  My Profile
                </Link>
              </li>
              {role === 'admin' && (
                <li>
                  <Link href="/admin" className="text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition-all duration-300">
                    Admin
                  </Link>
                </li>
              )}
              <li>
                <button 
                  onClick={handleLogout} 
                  className="text-white bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition-all duration-300">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login" className="text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition-all duration-300">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;

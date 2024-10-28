import Image from 'next/image';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto flex flex-col items-center md:flex-row md:justify-between">
        {/* Logo and Website Name */}
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <Image src="/images/logo.png" alt="Luno Trading Logo" className="w-8 h-8" />
          <span className="text-lg font-semibold">Luno Trading</span>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 text-center">
          <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition duration-300 text-sm md:text-base">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="text-gray-400 hover:text-white transition duration-300 text-sm md:text-base">
            Terms of Service
          </Link>
          <Link to="/contact" className="text-gray-400 hover:text-white transition duration-300 text-sm md:text-base">
            Contact Us
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-sm text-center mt-4 md:mt-0">&copy; 2019 Luno Trading. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

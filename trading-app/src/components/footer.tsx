import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto text-center">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">&copy; 2024 Luno Trading. All rights reserved.</p>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition duration-300 text-sm md:text-base">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300 text-sm md:text-base">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300 text-sm md:text-base">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

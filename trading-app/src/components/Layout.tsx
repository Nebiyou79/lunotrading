import React from 'react';
import NavBar from './navbar';
import Sidebar from './sidebar';
import Footer from './footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      {/* Navbar */}
      <NavBar />

      {/* Main content with sidebars */}
      <div className="flex flex-1">
        {/* Left Sidebar */}
        <aside className="md:w-72 bg-gray-800">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 space-y-6 bg-gray-100 shadow-inner rounded-lg">
          {children}
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;

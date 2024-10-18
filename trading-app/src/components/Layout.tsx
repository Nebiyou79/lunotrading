// Layout.tsx
import React from 'react';
import NavBar from './navbar';
import Sidebar from './sidebar';
import Footer from './footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-400">
      {/* Navbar */}
      <NavBar/>

      {/* Main content with sidebars */}
      <div className="flex flex-1">
        {/* Left Sidebar */}
        <aside className="w-64 bg-gray-700 p-4 text-white">
          <Sidebar/>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6  bg-orange-200">
          {children}
        </main>
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default Layout;

// pages/admin/index.tsx

import Sidebar from "@/components/admin/Sidebar";

const AdminDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold">Welcome to Admin Panel</h1>
        <p>Manage users, balances, and more here.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;

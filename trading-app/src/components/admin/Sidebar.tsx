// components/admin/Sidebar.tsx
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <ul className="space-y-4">
        <li><Link href="/admin">Users</Link></li>
        <li><Link href="/admin/Trades">Trade Outcomes</Link></li>
        <li><Link href="/admin/Deposits">Manage Deposits</Link></li>
        <li><Link href="/admin/Withdrawals">Manage Withdrawals</Link></li>
        <li><Link href="/admin/kyc">KYC Verification</Link></li>
        <li><Link href="/admin/support">Customer Support</Link></li>
        <li><Link href="/admin/adresses">Address Change</Link></li>

      </ul>
    </div>
  );
};

export default Sidebar;

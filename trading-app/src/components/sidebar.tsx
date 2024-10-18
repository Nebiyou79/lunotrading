import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 p-6">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold">Personal Center</h2>
      </div>
      <nav className="space-y-4">
        <Link href="/dashboard"
           className="block py-2.5 px-4 rounded transition hover:bg-gray-700">
            Profile
        </Link>
        <Link href="/dashboard/kyc"
           className="block py-2.5 px-4 rounded transition hover:bg-gray-700">
            KYC Verification
        </Link>
        <Link href="/dashboard/updateProfile"
           className="block py-2.5 px-4 rounded transition hover:bg-gray-700">
            Update Profie
        </Link>
        <Link href="/dashboard/tradehistory"
           className="block py-2.5 px-4 rounded transition hover:bg-gray-700">
            Trade History
        </Link>
        <Link href="/dashboard/customerSupport"
           className="block py-2.5 px-4 rounded transition hover:bg-gray-700">
            Customer Support
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;

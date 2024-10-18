// pages/admin/security.tsx
import Sidebar from '../../components/admin/Sidebar';

const SecuritySettingsPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10">
        <h2 className="text-2xl font-bold mb-4">Security Settings</h2>
        <p>Here you can manage security settings such as 2FA, password resets, and more.</p>
      </div>
    </div>
  );
};

export default SecuritySettingsPage;

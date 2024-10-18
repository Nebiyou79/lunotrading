/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { updateUserProfile, changePassword } from '../../utils/apiServices'; // Importing services
import Layout from '@/components/Layout';
import { toast } from 'react-toastify';

const UpdateProfile = () => {
  const [profileData, setProfileData] = useState({ name: '', email: '' });
  const [passwordData, setPasswordData] = useState({ oldPassword: '', newPassword: '' });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user profile details when the page loads (optional, assuming you have a fetch profile API)
    // You can pre-fill the form with user's current data here.
  }, []);

  // Handle input change for profile form
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  // Handle input change for password form
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  // Submit updated profile
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await updateUserProfile(profileData);
      setSuccessMessage('Profile updated successfully!');
      toast.success('Profile updated successfully!');
      setError(null);
    } catch (error: any) {
      setError(error.message || 'Failed to update profile');
      toast.error('Failed to update profile')
      setSuccessMessage(null);
    }
  };

  // Submit password change request
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await changePassword(passwordData);
      setSuccessMessage('Password changed successfully!');
      toast.success('Password changed successfully!')
      setError(null);
    } catch (error: any) {
      setError(error.message || 'Failed to change password');
      setSuccessMessage(null);
      toast.error('Failed to change password')
    }
  };

  return (
    <Layout>
    <div className="space-y-6">
      {/* Profile Update Form */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
        <form onSubmit={handleProfileSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={profileData.name}
              onChange={handleProfileChange}
              className="w-full p-2 bg-gray-900 text-white rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={profileData.email}
              onChange={handleProfileChange}
              className="w-full p-2 bg-gray-900 text-white rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Update Profile
          </button>
        </form>
      </div>

      {/* Password Change Form */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
        <form onSubmit={handlePasswordSubmit}>
          <div className="mb-4">
            <label htmlFor="oldPassword" className="block text-sm mb-2">Old Password</label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              value={passwordData.oldPassword}
              onChange={handlePasswordChange}
              className="w-full p-2 bg-gray-900 text-white rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-sm mb-2">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="w-full p-2 bg-gray-900 text-white rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Change Password
          </button>
        </form>
      </div>

      {/* Error or Success Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
    </div>
    </Layout>
  );
};

export default UpdateProfile;

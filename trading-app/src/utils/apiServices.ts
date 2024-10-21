/* eslint-disable @typescript-eslint/no-explicit-any */
// apiServices.ts

export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    const response = await fetch('https://116.203.108.180:5000/api/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Set the Authorization header
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch profile');
    }
    return data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (profileData: { name: string; email: string }) => {
  const response = await fetch('https://116.203.108.180:5000/api/profile/update', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profileData),
  });
  if (!response.ok) {
    throw new Error('Failed to update profile');
  }
  return await response.json();
};

// Change user password
export const changePassword = async (passwordData: { oldPassword: string; newPassword: string }) => {
  try {
    const response = await fetch('https://116.203.108.180:5000/api/profile/change-password', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(passwordData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to change password');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
};
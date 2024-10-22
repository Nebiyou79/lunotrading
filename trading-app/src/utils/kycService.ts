import axios from 'axios';

const API_URL = 'https://lunotrading.com/api/kyc'; // Adjust the URL based on your setup

// kycApiService.ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const submitKyc = async (userId: string, name: string, email: string, kycDocument: File) => {
  const formData = new FormData();
  formData.append('userId', userId);  // Append userId
  formData.append('name', name);
  formData.append('email', email);
  formData.append('kycDocument', kycDocument);  // Ensure this matches the field expected in the backend

  const response = await fetch('https://lunotrading.com/api/kyc/submit', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to upload KYC: ${response.statusText}`);
  }

  return await response.json();
};

// 2. Get KYC requests (used by admin)
export const getKYCRequests = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {    console.error('Error fetching KYC requests:', error);
    throw error;
  }
};

// 3. Approve KYC request (used by admin)
export const approveKYC = async (kycId: string) => {
  try {
    const response = await axios.put(`${API_URL}/approve/${kycId}`);
    return response.data;
  } catch (error) {
    console.error('Error approving KYC request:', error);
    throw error;
  }
};

// 4. Reject KYC request (used by admin)
export const rejectKYC = async (kycId: string) => {
  try {
    const response = await axios.put(`${API_URL}/reject/${kycId}`);
    return response.data;
  } catch (error) {
    console.error('Error rejecting KYC request:', error);
    throw error;
  }
};

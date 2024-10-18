import React, { useState, useEffect } from 'react';
import { submitKyc } from '../../utils/kycService'; // KYC service
import { jwtDecode } from 'jwt-decode';
import Layout from '@/components/Layout';

const KycForm: React.FC = () => {
  const [userId, setUserId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [proof, setProof] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>('');

  // Decode token to get userId on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: { id: string } = jwtDecode(token);
        if (decodedToken && decodedToken.id) {
          setUserId(decodedToken.id);
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProof(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!proof) {
      setMessage('Please select a file');
      return;
    }

    try {
      setLoading(true);
      const response = await submitKyc(userId, name, email, proof);
      console.log('KYC submitted successfully:', response);
      setMessage('KYC submitted successfully');
    } catch (error) {
      console.error('Error submitting KYC:', error);
      setMessage('Error submitting KYC');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Submit KYC</h2>

      <div className="mb-6">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 text-gray-900 placeholder-gray-400"
          placeholder="Enter your name"
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 text-gray-900 placeholder-gray-400"
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="proof" className="block text-sm font-medium text-gray-700 mb-2">Upload Proof Document</label>
        <input
          type="file"
          id="proof"
          onChange={handleFileChange}
          className="w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          required
        />
      </div>

      <button
        type="submit"
        className={`w-full py-3 text-white font-semibold rounded-lg shadow-md bg-blue-500 hover:bg-blue-600 transition-colors duration-300 ease-in-out ${
          loading ? 'opacity-70 cursor-not-allowed' : ''
        }`}
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5 mr-3 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            Submitting...
          </div>
        ) : (
          'Submit KYC'
        )}
      </button>

      {message && <p className="mt-4 text-center text-sm text-red-500">{message}</p>}
    </form>
    </Layout>
  );
};

export default KycForm;

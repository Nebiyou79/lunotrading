/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await axios.post('https://lunotrading.com/api/auth/login', {
        email,
        password,
      });

      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);
        toast.success('LOG IN successful');
        router.push('/');
      }
    } catch (err: any) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
        toast.error(err.response.data.message);
      } else {
        toast.error('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 relative">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/logo.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="filter blur-md brightness-50"
        />
      </div>

      {/* Container */}
      <div className="flex flex-col md:flex-row max-w-6xl w-full rounded-lg shadow-lg overflow-hidden bg-black relative z-10 p-5 md:p-0">
        
        {/* Left side: Logo and Name */}
        <div className="w-full md:w-1/2 p-5 flex flex-col justify-center items-center bg-gray-700">
          <Image src="/images/logo.png" alt="Bane View Logo" width={80} height={80} />
          <h1 className="text-3xl md:text-5xl font-extrabold text-blue-600 mt-4">BANE VIEW</h1>
          <h2 className="text-lg text-white mt-2">Your Trusted Trading Platform</h2>
        </div>

        {/* Right side: Login Form */}
        <div className="w-full md:w-1/2 p-5 md:p-10">
          <div className="max-w-sm mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-blue-600 mb-2">Login</h2>
              <p className="text-lg text-gray-600">Enter your credentials to access your account</p>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-left text-gray-700 mb-2 text-sm">Email Address</label>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-left text-gray-700 mb-2 text-sm">Password</label>
                <input
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out"
              >
                Login
              </button>
            </form>

            {/* Forgot Password & Google Login */}
            <div className="flex justify-between items-center mt-6">
              <Link className="text-blue-600 text-sm hover:underline" href="/forgot-password">
                Forgot Password?
              </Link>
              <Link className="text-blue-600 text-sm hover:underline" href="/signup">
                Sign Up
              </Link>
            </div>

            <div className="my-6">
              <hr className="border-gray-300" />
            </div>

            <div className="mt-6">
              <button className="w-full bg-red-500 text-white p-3 rounded-md hover:bg-red-600 transition duration-200 ease-in-out">
                Login with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
      });

      if (res.status === 201) {
        toast.success('SIGN UP successful');
        // Redirect to login after successful registration
        router.push('/login');
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
        toast.error(err.response.data.message)
      } else {
        setError('An unexpected error occurred.');
        toast.error('An unexpected error occurred')
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 relative">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/logo.png" // Replace with your background image path
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="filter blur-md brightness-50"
        />
      </div>

      <div className="flex max-w-6xl w-full rounded-lg shadow-lg overflow-hidden bg-black relative z-10">
        <div className="w-1/2 p-10 flex flex-col justify-center items-center bg-gray-700">
          <Image src="/images/logo.png" alt="Bane View Logo" width={80} height={80} />
          <h1 className="text-5xl font-extrabold text-blue-600 mt-4">BANE VIEW</h1>
          <h2 className="text-lg text-white mt-2">Your Trusted Trading Platform</h2>
        </div>

        <div className="w-1/2 p-10">
          <div className="max-w-sm mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-blue-600 mb-2">Register</h2>
              <p className="text-lg text-gray-600">Create your account to start trading</p>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-left text-gray-700 mb-2 text-sm">Full Name</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter your Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
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

              <div className="mb-4">
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

              <div className="mb-6">
                <label className="block text-left text-gray-700 mb-2 text-sm">Confirm Password</label>
                <input
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out"
              >
                Register
              </button>
            </form>

            <div className="flex justify-between items-center mt-6">
              <Link className="text-blue-600 text-sm hover:underline" href="/login">
                Already have an account? Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import Link from 'next/link';
import '../../styles/globals.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      window.location.href = '/';
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md text-black">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Username</label>
              <input
                type="text"
                placeholder="Try 'test'"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg text-black placeholder-black/50"
              />
            </div>
            <div>
              <label className="block mb-1">Password</label>
              <input
                type="password"
                placeholder="Try '123'"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg text-black placeholder-black/50"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-200"
            >
              Login
            </button>
          </form>
          <p className="text-center text-sm mt-4">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-blue-500 underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
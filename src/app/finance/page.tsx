'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '../../lib/auth';

export default function Finance() {
  const router = useRouter();
  const [entries, setEntries] = useState<{ description: string; amount: number }[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = isAuthenticated();
      setAuthenticated(auth);
      setLoading(false);
    }
  }, []);

  const handleAddEntry = () => {
    if (description && amount) {
      setEntries([...entries, { description, amount: parseFloat(amount) }]);
      setDescription('');
      setAmount('');
    }
  };

  const totalIncome = entries.filter(e => e.amount > 0).reduce((sum, e) => sum + e.amount, 0);
  const totalExpenses = entries.filter(e => e.amount < 0).reduce((sum, e) => sum + e.amount, 0);
  const net = totalIncome + totalExpenses;

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-bold mb-4 text-black">Access Denied</h1>
        <p className="mb-6 text-black">Please log in to access the Finance page.</p>
        <button
          onClick={() => router.push('/login')}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="font-sans p-5">
      <Header />
      <h1 className="text-4xl font-bold text-center mt-6 mb-6">Finance & Budget Tracking</h1>

      <div className="max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <input
            type="text"
            placeholder="Description (e.g., Rent, Cleaning)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Amount</label>
          <input
            type="number"
            placeholder="Amount (e.g., 300, -1000)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <button
            onClick={handleAddEntry}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
          >
            Add Entry
          </button>
        </div>

        <ul className="space-y-2">
          {entries.map((entry, index) => (
            <li key={index}>
              {entry.description}: ${entry.amount.toFixed(2)}
            </li>
          ))}
        </ul>

        <hr className="my-4" />
        <p><strong>Total Income:</strong> ${totalIncome.toFixed(2)}</p>
        <p><strong>Total Expenses:</strong> ${Math.abs(totalExpenses).toFixed(2)}</p>
        <p><strong>Net:</strong> ${net.toFixed(2)}</p>
      </div>
    </div>
  );
}
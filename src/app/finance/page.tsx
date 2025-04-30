'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '../../lib/auth';

export default function Finance() {
  const router = useRouter();
  const [entries, setEntries] = useState<{ description: string; amount: number }[]>([]); // Fixed the type here
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
    return <div>Loading...</div>;
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="mb-6">Please log in to access the Finance page.</p>
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
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <Header />
      <h1 style={{
        textAlign: 'center',
        fontSize: '40px',
        fontWeight: 'bold',
        marginBottom: '20px'
      }}>
        Finance & Budget Tracking
      </h1>

      <div style={{ maxWidth: '600px', margin: '20px auto' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Description</label>
          <input
            type="text"
            placeholder="Description (e.g., Rent, Cleaning)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              padding: '10px',
              width: '100%',
              marginBottom: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Amount</label>
          <input
            type="number"
            placeholder="Amount (e.g., 300, -1000)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              padding: '10px',
              width: '100%',
              marginBottom: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc'
            }}
          />
        </div>

        <div style={{
          marginBottom: '15px',
          padding: '10px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          display: 'inline-block'
        }}>
          <button
            onClick={handleAddEntry}
            style={{ display: 'block', width: '100%', padding: '10px 20px', borderRadius: '8px' }}
          >
            Add Entry
          </button>
        </div>

        <ul style={{ marginTop: '20px' }}>
          {entries.map((entry, index) => (
            <li key={index} style={{ marginBottom: '5px' }}>
              {entry.description}: ${entry.amount.toFixed(2)}
            </li>
          ))}
        </ul>

        <hr />
        <p><strong>Total Income:</strong> ${totalIncome.toFixed(2)}</p>
        <p><strong>Total Expenses:</strong> ${Math.abs(totalExpenses).toFixed(2)}</p>
        <p><strong>Net:</strong> ${net.toFixed(2)}</p>
      </div>
    </div>
  );
}
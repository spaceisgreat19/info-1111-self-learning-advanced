'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function Vote() {
  const [votes, setVotes] = useState<{ yes: number; no: number }>({ yes: 0, no: 0 });

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const res = await fetch('/api/votes?issueId=1');
        const data = await res.json();
        if (res.ok) {
          setVotes({ yes: data.yes, no: data.no });
        } else {
          console.error('Failed to fetch votes');
        }
      } catch (error) {
        console.error('Error fetching votes:', error);
      }
    };

    fetchVotes();
  }, []);

  const handleVote = async (option: 'yes' | 'no') => {
    try {
      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ option, userId: 1, issueId: 1 }),
      });

      if (res.ok) {
        const updated = await fetch('/api/votes?issueId=1');
        const data = await updated.json();
        setVotes({ yes: data.yes, no: data.no });
      } else {
        console.error('Failed to record vote');
      }
    } catch (error) {
      console.error('Error recording vote:', error);
    }
  };

  const data = [
    { name: 'Yes', votes: votes.yes },
    { name: 'No', votes: votes.no },
  ];

  return (
    <div>
      <Header />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          minHeight: '80vh',
          backgroundColor: '#f8f9fa',
          padding: '20px',
        }}
      >
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          Vote on Strata Issues
        </h1>

        <div style={{ width: '100%', maxWidth: '800px', marginBottom: '20px' }}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="votes" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            width: '100%',
            maxWidth: '600px',
            textAlign: 'center',
            marginBottom: '20px',
          }}
        >
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>
            Yes: {votes.yes}
          </p>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
            No: {votes.no}
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%',
            maxWidth: '600px',
          }}
        >
          <button
            onClick={() => handleVote('yes')}
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '10px 20px',
              fontSize: '1rem',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
              width: '45%',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#45a049')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#4CAF50')}
          >
            Vote Yes
          </button>
          <button
            onClick={() => handleVote('no')}
            style={{
              backgroundColor: '#f44336',
              color: 'white',
              padding: '10px 20px',
              fontSize: '1rem',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
              width: '45%',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e53935')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#f44336')}
          >
            Vote No
          </button>
        </div>
      </div>
    </div>
  );
}
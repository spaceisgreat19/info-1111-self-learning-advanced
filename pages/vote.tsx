import { useState, useEffect } from 'react';
import Header from '../components/Header';

export default function Vote() {
  const [votes, setVotes] = useState<{ yes: number; no: number }>({ yes: 0, no: 0 });

  useEffect(() => {
    // Function to fetch votes from the API
    const fetchVotes = async () => {
      const res = await fetch('/api/votes');
      const data = await res.json();
      setVotes({ yes: data.yes, no: data.no });
    };

    fetchVotes();
  }, []); // Fetch votes once on page load

  // Function to handle the voting process
  const handleVote = async (option: 'yes' | 'no') => {
    await fetch('/api/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ option, userId: 1 }), // Replace 1 with the actual logged-in user ID
    });

    // Refresh votes after submitting a vote
    const res = await fetch('/api/votes');
    const data = await res.json();
    setVotes({ yes: data.yes, no: data.no });
  };

  return (
    <div>
      <Header />
      <h1>Vote on Strata Issues</h1>
      <button onClick={() => handleVote('yes')}>Vote Yes</button>
      <button onClick={() => handleVote('no')}>Vote No</button>
      <p>Yes: {votes.yes}</p>
      <p>No: {votes.no}</p>
    </div>
  );
}
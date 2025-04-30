import { useEffect, useState } from 'react';
import Header from '../components/Header';

const MaintenanceRequests = () => {
  const [requests, setRequests] = useState<{ id: number; apartment: string; issue: string; completed: boolean }[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [showCompleted, setShowCompleted] = useState<'all' | 'completed' | 'incomplete'>('all');

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const fetchRequests = async () => {
        const response = await fetch('/api/log-maintenance');
        const data = await response.json();
        setRequests(data.map((item: any) => ({
          id: item.id,
          apartment: item.apartment,
          issue: item.issue,
          completed: item.completed ?? false
        })));
      };
      fetchRequests();
    }
  }, [isClient]);

  const toggleCompleted = async (index: number) => {
    const updatedRequests = [...requests];
    const request = updatedRequests[index];
    request.completed = !request.completed;
    setRequests(updatedRequests);

    await fetch('/api/log-maintenance', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: request.id, completed: request.completed })
    });
  };

  const filteredRequests = requests.filter(request => {
    if (showCompleted === 'completed') return request.completed;
    if (showCompleted === 'incomplete') return !request.completed;
    return true;
  });

  return (
    <div>
      <Header />
      <h1>Maintenance Requests</h1>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="filter">Filter: </label>
        <select id="filter" onChange={e => setShowCompleted(e.target.value as 'all' | 'completed' | 'incomplete')}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>

      <ul>
        {filteredRequests.length === 0 ? (
          <p>No maintenance requests available.</p>
        ) : (
          filteredRequests.map((request, index) => (
            <li key={request.id} style={{ marginBottom: '10px' }}>
              <input
                type="checkbox"
                checked={request.completed}
                onChange={() => toggleCompleted(index)}
                style={{ marginRight: '10px' }}
              />
              <strong>{request.apartment}</strong>: {request.issue}
              {request.completed && <span style={{ color: 'green', marginLeft: '10px' }}>(Completed)</span>}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default MaintenanceRequests;
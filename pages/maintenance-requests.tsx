import { useEffect, useState } from 'react';
import Header from '../components/Header';

interface MaintenanceRequest {
  id: number;
  apartment: string;
  issue: string;
  completed: boolean;
}

const MaintenanceRequests = () => {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [showCompleted, setShowCompleted] = useState<'all' | 'completed' | 'incomplete'>('all');

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const fetchRequests = async () => {
        try {
          const response = await fetch('/api/log-maintenance');
          const data: MaintenanceRequest[] = await response.json();
          setRequests(data.map(item => ({
            id: item.id,
            apartment: item.apartment,
            issue: item.issue,
            completed: item.completed ?? false,
          })));
        } catch (error) {
          console.error('Error fetching maintenance requests:', error);
        }
      };
      fetchRequests();
    }
  }, [isClient]);

  const toggleCompleted = async (id: number) => {
    const updatedRequests = [...requests];
    const request = updatedRequests.find(req => req.id === id);
    if (request) {
      request.completed = !request.completed;
      setRequests(updatedRequests);

      await fetch('/api/log-maintenance', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: request.id, completed: request.completed }),
      });
    }
  };

  const filteredRequests = requests.filter(request => {
    if (showCompleted === 'completed') return request.completed;
    if (showCompleted === 'incomplete') return !request.completed;
    return true;
  });

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f4f7fc' }}>
      <Header />
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '30px' }}>
        <h1 style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>Maintenance Requests</h1>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="filter" style={{ fontSize: '1.1rem', marginRight: '10px' }}>Filter: </label>
          <select
            id="filter"
            onChange={e => setShowCompleted(e.target.value as 'all' | 'completed' | 'incomplete')}
            style={{
              padding: '8px 12px',
              fontSize: '1rem',
              borderRadius: '5px',
              border: '1px solid #ccc',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>

        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {filteredRequests.length === 0 ? (
            <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#888' }}>No maintenance requests available.</p>
          ) : (
            filteredRequests.map((request) => (
              <li key={request.id} style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #ddd' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                    <strong>{request.apartment}</strong>: {request.issue}
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      checked={request.completed}
                      onChange={() => toggleCompleted(request.id)}
                      style={{ marginRight: '10px' }}
                    />
                    <span
                      style={{
                        fontSize: '1rem',
                        color: request.completed ? 'green' : 'orange',
                        fontWeight: 'bold',
                      }}
                    >
                      {request.completed ? 'Completed' : 'Incomplete'}
                    </span>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default MaintenanceRequests;
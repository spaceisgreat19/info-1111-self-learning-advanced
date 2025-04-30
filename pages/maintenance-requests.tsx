import { useEffect, useState } from 'react';
import Header from '../components/Header';

// Define the MaintenanceRequest type
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
          const data: MaintenanceRequest[] = await response.json();  // Explicitly define the type here
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

  // Toggle the 'completed' status
  const toggleCompleted = async (id: number) => {
    const updatedRequests = [...requests];
    const request = updatedRequests.find(req => req.id === id);  // Use id to directly find the request
    if (request) {
      request.completed = !request.completed;
      setRequests(updatedRequests);

      // Send the updated status to the API
      await fetch('/api/log-maintenance', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: request.id, completed: request.completed }),
      });
    }
  };

  // Filter the requests based on the selected status
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
          filteredRequests.map((request) => (
            <li key={request.id} style={{ marginBottom: '10px' }}>
              <input
                type="checkbox"
                checked={request.completed}
                onChange={() => toggleCompleted(request.id)}  // Use id to toggle completion
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
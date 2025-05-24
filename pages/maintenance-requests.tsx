import { useEffect, useState } from 'react';
import Header from '../components/Header';

interface MaintenanceRequest {
  id: number;
  apartment: string;
  issue: string;
  priority: 'Low' | 'Medium' | 'High';
  created_at: string;
  completed: boolean;
}

const MaintenanceRequests = () => {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [showCompleted, setShowCompleted] = useState<'all' | 'completed' | 'incomplete'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'Low' | 'Medium' | 'High'>('all');
  const [dateSort, setDateSort] = useState<'earliest' | 'latest'>('earliest');

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const fetchRequests = async () => {
        try {
          const response = await fetch('/api/log-maintenance');
          let data: MaintenanceRequest[] = await response.json();

          data = data.map(req => ({
            ...req,
            priority: req.priority || 'Medium'
          }));

          setRequests(data);
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

  const changePriority = async (id: number, newPriority: 'Low' | 'Medium' | 'High') => {
    const updatedRequests = requests.map(req =>
      req.id === id ? { ...req, priority: newPriority } : req
    );
    setRequests(updatedRequests);

    await fetch('/api/log-maintenance', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, priority: newPriority }),
    });
  };

  const filteredRequests = requests.filter(request => {
    const statusMatch =
      showCompleted === 'all' ||
      (showCompleted === 'completed' && request.completed) ||
      (showCompleted === 'incomplete' && !request.completed);

    const priorityMatch = priorityFilter === 'all' || request.priority === priorityFilter;

    return statusMatch && priorityMatch;
  });

  // Sort filteredRequests by date
  filteredRequests.sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return dateSort === 'earliest' ? dateA - dateB : dateB - dateA;
  });

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f7fc' }}>
      <Header />
      <div style={{
        maxWidth: '800px',
        margin: '20px auto',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '30px'
      }}>
        <h1 style={{
          textAlign: 'center',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#333'
        }}>
          Maintenance Requests
        </h1>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <div>
            <label style={{ fontSize: '1.1rem', marginRight: '10px' }}>Status:</label>
            <select
              onChange={e => setShowCompleted(e.target.value as 'all' | 'completed' | 'incomplete')}
              value={showCompleted}
              style={{ padding: '8px 12px', fontSize: '1rem', borderRadius: '5px' }}
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="incomplete">Incomplete</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '1.1rem', marginRight: '10px' }}>Priority:</label>
            <select
              onChange={e => setPriorityFilter(e.target.value as 'all' | 'Low' | 'Medium' | 'High')}
              value={priorityFilter}
              style={{ padding: '8px 12px', fontSize: '1rem', borderRadius: '5px' }}
            >
              <option value="all">All</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '1.1rem', marginRight: '10px' }}>Sort by Date:</label>
            <select
              onChange={e => setDateSort(e.target.value as 'earliest' | 'latest')}
              value={dateSort}
              style={{ padding: '8px 12px', fontSize: '1rem', borderRadius: '5px' }}
            >
              <option value="earliest">Earliest to Latest</option>
              <option value="latest">Latest to Earliest</option>
            </select>
          </div>
        </div>

        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {filteredRequests.length === 0 ? (
            <p style={{
              textAlign: 'center',
              fontSize: '1.2rem',
              color: '#888'
            }}>No maintenance requests available.</p>
          ) : (
            filteredRequests.map((request) => (
              <li key={request.id} style={{
                marginBottom: '20px',
                padding: '15px',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                border: '1px solid #ddd'
              }}>
                <div style={{
                  marginBottom: '5px',
                  fontWeight: 'bold',
                  fontSize: '1.2rem'
                }}>
                  {request.apartment} - {request.issue}
                </div>
                <div style={{
                  marginBottom: '5px',
                  fontSize: '0.95rem'
                }}>
                  Date: {new Date(request.created_at).toLocaleDateString()}
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <label style={{ marginRight: '10px' }}>Priority:</label>
                    <select
                      value={request.priority}
                      onChange={(e) => changePriority(request.id, e.target.value as 'Low' | 'Medium' | 'High')}
                      style={{ padding: '5px 10px', borderRadius: '5px' }}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      checked={request.completed}
                      onChange={() => toggleCompleted(request.id)}
                      style={{ marginRight: '10px' }}
                    />
                    <span style={{
                      fontSize: '1rem',
                      color: request.completed ? 'green' : 'orange',
                      fontWeight: 'bold'
                    }}>
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
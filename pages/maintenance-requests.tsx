import { useEffect, useState } from 'react';
import Header from '../components/Header';

const MaintenanceRequests = () => {
  const [requests, setRequests] = useState<{ apartment: string; issue: string }[]>([]);
  const [isClient, setIsClient] = useState(false); // New state to track client-side render

  // Set isClient to true once the component mounts (client-side)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only fetch data on the client-side
  useEffect(() => {
    if (isClient) {
      const fetchRequests = async () => {
        const response = await fetch('/api/log-maintenance');
        const data = await response.json();
        setRequests(data);
      };

      fetchRequests();
    }
  }, [isClient]);

  return (
    <div>
      <Header />
      <h1>Maintenance Requests</h1>
      <ul>
        {requests.length === 0 ? (
          <p>No maintenance requests available.</p>
        ) : (
          requests.map((request, index) => (
            <li key={index}>
              <strong>{request.apartment}</strong>: {request.issue}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default MaintenanceRequests;
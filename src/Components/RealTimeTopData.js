import React, { useEffect, useState } from 'react';
import TopPosts from './TopPosts';
import TopUsers from './TopUsers';

function RealTimeTopData() {
  const [topPosts, setTopPosts] = useState([]);
  const [topUsers, setTopUsers] = useState([]);
  const [connectionError, setConnectionError] = useState(false);

  useEffect(() => {
    let ws;
    let reconnectInterval;

    const connectWebSocket = () => {
      ws = new WebSocket('ws://localhost:6001');

      ws.onopen = () => {
        console.log("WebSocket connected");
        setConnectionError(false); // Reset error state on successful connection
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          setTopPosts(data.topPosts.length === 0 ? null : data.topPosts);
          setTopUsers(data.topUsers.length === 0 ? null : data.topUsers);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setConnectionError(true);
      };

      ws.onclose = () => {
        console.warn('WebSocket closed, attempting to reconnect...');
        setConnectionError(true);
        reconnectInterval = setTimeout(connectWebSocket, 3000); // Retry connection after 3 seconds
      };
    };

    connectWebSocket();

    // Clean up on component unmount
    return () => {
      clearTimeout(reconnectInterval);
      if (ws) ws.close();
    };
  }, []);

  return (
    <div>
      <h2>Top Posts and Users (Real-Time Updates)</h2>
          {connectionError && <p style={{ color: 'red' }}>Connection error, attempting to reconnect...</p>}
          <TopPosts data={topPosts} />
          <TopUsers data={topUsers} />
    </div>
  );
}

export default RealTimeTopData;

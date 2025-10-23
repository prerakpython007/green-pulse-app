import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(true);

  // URL of your DEPLOYED backend API
  const API_URL = 'https://green-pulse-backend-seven.vercel.app/';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setSensorData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
    // Optional: Set up an interval to fetch new data every 30 seconds
    const intervalId = setInterval(fetchData, 30000);
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Get the latest reading (first item in the array)
  const latestData = sensorData[0];

  return (
    <div className="App">
      <h1>🌿 Plant Monitor</h1>
      {latestData ? (
        <div className="sensor-readings">
          <div className="reading-card">
            <h2>Temperature</h2>
            <p>{latestData.temperature} °C</p>
          </div>
          <div className="reading-card">
            <h2>Humidity</h2>
            <p>{latestData.humidity} %</p>
          </div>
          <div className="reading-card">
            <h2>Soil Moisture</h2>
            <p>{latestData.soilMoisture} %</p>
          </div>
          <p><small>Last updated: {new Date(latestData.timestamp).toLocaleString()}</small></p>
        </div>
      ) : (
        <p>No data received from the sensor.</p>
      )}
    </div>
  );
}

export default App;
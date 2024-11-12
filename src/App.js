import React from 'react';
import RealTimeTopData from './Components/RealTimeTopData';
import ErrorBoundary from './Components/ErrorBoundary'; // Import the ErrorBoundary

function App() {
  return (
    <div className="App">
      <h1>Reddit Top Data Dashboard</h1>

      {/* Wrap the RealTimeTopData component with the ErrorBoundary */}
      <ErrorBoundary>
        <RealTimeTopData />
      </ErrorBoundary>
    </div>
  );
}

export default App;

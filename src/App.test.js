import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock RealTimeTopData to simulate an error
jest.mock('./Components/RealTimeTopData', () => {
  return () => {
    throw new Error('Test error');
  };
});

describe('App Component', () => {
  it('displays fallback UI when RealTimeTopData throws an error', () => {
    render(<App />);

    // Check that the fallback UI from ErrorBoundary is displayed
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });
});

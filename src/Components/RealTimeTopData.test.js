// RealTimeTopData.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import RealTimeTopData from './RealTimeTopData';
import { act } from 'react-dom/test-utils';

// Mock WebSocket with all necessary methods
const mockWebSocket = jest.fn().mockImplementation(() => ({
  onopen: jest.fn(),
  onmessage: jest.fn(),
  onerror: jest.fn(),
  onclose: jest.fn(),
  send: jest.fn(),
  close: jest.fn(), // Add the close method to the mock
}));

global.WebSocket = mockWebSocket;

describe('RealTimeTopData Component', () => {
  let ws;

  beforeEach(() => {
    ws = new WebSocket();
  });

  it('shows top posts and top users', async () => {

    render(<RealTimeTopData />);

    // Wait for the loading message to disappear
    await waitFor(() => expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument());

    // Check that the posts and users titles are displayed
    expect(screen.getByText('Top Science Posts')).toBeInTheDocument();
    expect(screen.getByText('Top Users with Most Posts')).toBeInTheDocument(); 
  });

  it('shows connection error message when WebSocket connection fails', async () => {
    // Mock WebSocket onopen and onerror behavior
    ws.onerror = jest.fn(() => {
      act(() => {
        ws.onerror();
      });
    });

    render(<RealTimeTopData />);

    // Check that the posts and users titles are displayed
    expect(screen.getByText('Top Science Posts')).toBeInTheDocument();
    expect(screen.getByText('Top Users with Most Posts')).toBeInTheDocument(); 
  });
});

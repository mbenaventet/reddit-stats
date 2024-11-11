import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import TopUsers from './TopUsers';

jest.mock('axios');

describe('TopUsers Component', () => {
  it('should fetch and display users', async () => {
    // Mock a successful response for axios.get
    axios.get.mockResolvedValue({
      data: [
        { id: '1', user: 'User1', count: 120 },
        { id: '2', user: 'User2', count: 100 },
      ],
    });

    render(<TopUsers />);
    //screen.debug();

    // Wait for the users to be rendered and use data-testid to verify content
    await waitFor(() => expect(screen.getByTestId('user-1')).toHaveTextContent('User1 - 120 posts'));
    expect(screen.getByTestId('user-1')).toHaveTextContent('User1 - 120 posts');
    expect(screen.getByTestId('user-2')).toHaveTextContent('User2 - 100 posts');
  });

  it('should handle error when fetching users', async () => {
    // Mock an error response for axios.get
    axios.get.mockRejectedValue(new Error('Failed to load users. Please try again later.'));

    render(<TopUsers />);

    // Use findByText to handle error message display
    await expect(screen.findByText('Failed to load users. Please try again later.')).resolves.toBeInTheDocument();
  });
});

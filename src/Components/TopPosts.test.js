import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import TopPosts from './TopPosts';

// Mock axios
jest.mock('axios');

describe('TopPosts', () => {
  it('should fetch and display posts', async () => {
    // Mock the axios GET request
    axios.get.mockResolvedValue({
      data: [
        { data: { id: '1', title: 'Post 1' } },
        { data: { id: '2', title: 'Post 2' } }
      ]
    });

    render(<TopPosts />);

    // Wait for the component to finish loading
    await waitFor(() => screen.getByText('Post 1'));

    // Check if the posts are rendered correctly
    expect(screen.getByText('Post 1')).toBeInTheDocument();
    expect(screen.getByText('Post 2')).toBeInTheDocument();
  });

  it('should handle error when fetching posts', async () => {
    // Mock an error for axios GET request
    axios.get.mockRejectedValue(new Error('Failed to load posts. Please try again later.'));

    render(<TopPosts />);

    // Wait for error message
    await waitFor(() => screen.getByText('Failed to load posts. Please try again later.'));

    expect(screen.getByText('Failed to load posts. Please try again later.')).toBeInTheDocument();
  });
});

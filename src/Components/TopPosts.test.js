import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import TopPosts from './TopPosts';

// Mock the axios module
jest.mock('axios');

describe('TopPosts Component', () => {
    test('renders loading state initially', () => {
        render(<TopPosts />);
        expect(screen.getByText(/loading posts/i)).toBeInTheDocument();
    });

    test('displays posts after successful API call', async () => {
        const mockData = [
            { data: { title: 'Post 1', ups: 100, permalink: '/r/science/post1' } },
            { data: { title: 'Post 2', ups: 200, permalink: '/r/science/post2' } }
        ];
        axios.get.mockResolvedValueOnce({ data: mockData });

        render(<TopPosts />);

        await waitFor(() => screen.getByText('Post 1'));

        expect(screen.getByText('Post 1')).toBeInTheDocument();
        expect(screen.getByText('Post 2')).toBeInTheDocument();
    });

    test('displays error message if API call fails', async () => {
        axios.get.mockRejectedValueOnce(new Error('Failed to fetch data'));

        render(<TopPosts />);

        await waitFor(() => screen.getByText(/failed to load posts/i));
        expect(screen.getByText(/failed to load posts/i)).toBeInTheDocument();
    });
});

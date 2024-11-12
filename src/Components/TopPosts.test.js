import React from 'react';
import { render, screen } from '@testing-library/react';
import TopPosts from './TopPosts'; // Import the component

describe('TopPosts Component', () => {
  // Test if the component renders
  it('renders without crashing', () => {
    render(<TopPosts data={[]} />);
    const heading = screen.getByText(/Top Science Posts/i);
    expect(heading).toBeInTheDocument();
  });

  // Test if posts are displayed with title and votes
  it('displays posts with titles and upvotes', () => {
    const data = [
      { data: { title: 'Post 1', ups: 100, permalink: '/post1' } },
      { data: { title: 'Post 2', ups: 200, permalink: '/post2' } },
    ];

    render(<TopPosts data={data} />);

    // Check if the post titles and upvotes are rendered
    expect(screen.getByText('Post 1')).toBeInTheDocument();
    expect(screen.getByText('Post 2')).toBeInTheDocument();
    expect(screen.getByText('- 200 votes')).toBeInTheDocument();
    expect(screen.getByText('- 100 votes')).toBeInTheDocument();
  });

  // Test if the links are correct and open in a new tab
  it('renders links with correct href and target attributes', () => {
    const data = [
      { data: { title: 'Post 1', ups: 100, permalink: '/post1' } },
      { data: { title: 'Post 2', ups: 200, permalink: '/post2' } },
    ];

    render(<TopPosts data={data} />);

    // Check if the links have correct href attributes
    const postLinks = screen.getAllByRole('link');
    expect(postLinks[0]).toHaveAttribute('href', 'https://www.reddit.com/post1');
    expect(postLinks[1]).toHaveAttribute('href', 'https://www.reddit.com/post2');

    // Ensure that the links open in a new tab (rel="noopener noreferrer")
    expect(postLinks[0]).toHaveAttribute('target', '_blank');
    expect(postLinks[1]).toHaveAttribute('target', '_blank');
    expect(postLinks[0]).toHaveAttribute('rel', 'noopener noreferrer');
    expect(postLinks[1]).toHaveAttribute('rel', 'noopener noreferrer');
  });

  // Test if no posts are displayed when data is empty
  it('does not display any posts when data is empty', () => {
    render(<TopPosts data={[]} />);
    const listItems = screen.queryAllByRole('listitem');
    expect(listItems).toHaveLength(0); // Should be no list items
  });

  // Test if undefined data does not break the component
  it('does not break when data is undefined', () => {
    render(<TopPosts data={undefined} />);
    const heading = screen.getByText(/Top Science Posts/i);
    expect(heading).toBeInTheDocument();
  });
});

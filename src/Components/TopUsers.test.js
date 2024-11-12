import React from 'react';
import { render, screen } from '@testing-library/react';
import TopUsers from './TopUsers'; // Import the component

describe('TopUsers Component', () => {
  // Test if the component renders
  it('renders without crashing', () => {
    render(<TopUsers data={[]} />);
    const heading = screen.getByText(/Top Users with Most Posts/i);
    expect(heading).toBeInTheDocument();
  });

  // Test if data is displayed correctly
  it('displays users and their post counts', () => {
    const data = [
      { id: 1, user: 'User1', count: 120 },
      { id: 2, user: 'User2', count: 100 },
    ];

    render(<TopUsers data={data} />);

    // Check if the user names and post counts are rendered
    expect(screen.getByText('User1 - 120 posts')).toBeInTheDocument();
    expect(screen.getByText('User2 - 100 posts')).toBeInTheDocument();
  });

  // Test if no users are displayed when data is empty
  it('does not display any users when data is empty', () => {
    render(<TopUsers data={[]} />);
    const listItems = screen.queryAllByTestId(/^user-/); // Query by test id pattern
    expect(listItems).toHaveLength(0); // Should be no list items
  });

  // Test if undefined data does not break the component
  it('does not break when data is undefined', () => {
    render(<TopUsers data={undefined} />);
    const heading = screen.getByText(/Top Users with Most Posts/i);
    expect(heading).toBeInTheDocument();
  });
});

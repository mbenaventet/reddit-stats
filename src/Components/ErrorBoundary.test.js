import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

// Create a mock child component that will throw an error
function ErrorThrowingComponent() {
  throw new Error('Test error message');
}

describe('ErrorBoundary Component', () => {
  it('displays fallback UI with error message when child component throws an error', () => {
    // Render ErrorBoundary with the error-throwing component as a child
    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    // Check for the fallback UI and error message
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('renders children correctly when there is no error', () => {
    // Render ErrorBoundary with a regular child component
    render(
      <ErrorBoundary>
        <div>Child component content</div>
      </ErrorBoundary>
    );

    // Check that the child content renders without error
    expect(screen.getByText(/Child component content/i)).toBeInTheDocument();
    expect(screen.queryByText(/Something went wrong/i)).not.toBeInTheDocument();
  });
});

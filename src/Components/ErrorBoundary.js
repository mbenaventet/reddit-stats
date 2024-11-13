import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error) {
    // Update state to display fallback UI on error
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error, errorInfo) {
    // Log error info (you can send this to a logging service)
    if (process.env.NODE_ENV !== 'test') {
        console.error("Something went wrong:", error, errorInfo);
    }
    
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI if there's an error
      return (
        <div style={{ color: 'red', padding: '20px', border: '1px solid red' }}>
          <h2>Something went wrong!</h2>
          <p>{this.state.errorMessage}</p>
        </div>
      );
    }

    return this.props.children; // Render children if no error
  }
}

export default ErrorBoundary;

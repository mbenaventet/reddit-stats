import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import TopPosts from './Components/TopPosts';
import TopUsers from './Components/TopUsers';
import ErrorBoundary from './Components/ErrorBoundary'; // Import ErrorBoundary

function App() {
    return (
        <Router>
            <div className="App">
                <h1>Reddit Science Stats</h1>
                <nav>
                    <ul>
                        <li>
                            <Link to="/top-posts">Top Posts</Link>
                        </li>
                        <li>
                            <Link to="/top-users">Top Users</Link>
                        </li>
                    </ul>
                </nav>

                <ErrorBoundary> {/* Wrap routes with ErrorBoundary */}
                    <Routes>
                        <Route path="/top-posts" element={<TopPosts />} />
                        <Route path="/top-users" element={<TopUsers />} />
                        <Route path="/" element={<h2>Welcome to Reddit Science Stats!</h2>} />
                    </Routes>
                </ErrorBoundary>
            </div>
        </Router>
    );
}

export default App;

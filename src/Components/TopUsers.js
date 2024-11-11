import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TopUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Track errors

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/science/top-users');
                setUsers(response.data);
            } catch (error) {
                //console.error('Error fetching users:', error);
                setError('Failed to load users. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h2>Top Users with Most Posts</h2>
            {loading && <p>Loading users...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error */}
            {!loading && !error && (
                <ul>
                    {users.map((user, index) => (
                        <li key={user.id} data-testid={`user-${user.id}`}>
                            {user.user} - {user.count} posts
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TopUsers;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TopPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Track errors

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/science/top-posts');
                if (response.data && Array.isArray(response.data)) {
                    setPosts(response.data);
                } else {
                    throw new Error('Invalid data format');
                }
            } catch (error) {
                //console.error('Error fetching posts:', error);
                setError('Failed to load posts. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div>
            <h2>Top Science Posts</h2>
            {loading && <p>Loading posts...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error */}
            {!loading && !error && (
                <ul>
                    {posts.map((post, index) => (
                        <li key={index}>
                            <a href={`https://www.reddit.com${post.data.permalink}`} target="_blank" rel="noopener noreferrer">
                                {post.data.title}
                            </a> - {post.data.ups} votes
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TopPosts;

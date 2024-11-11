function TopPosts({data}) {
    return (
        <div>
            <h2>Top Science Posts</h2>
            <ul>
                {data !== undefined && data.map((post, index) => (
                    <li key={index}>
                        <a href={`https://www.reddit.com${post.data.permalink}`} target="_blank" rel="noopener noreferrer">
                            {post.data.title}
                        </a> - {post.data.ups} votes
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TopPosts;

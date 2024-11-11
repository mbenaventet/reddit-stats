function TopUsers({data}) {


    return (
        <div>
            <h2>Top Users with Most Posts</h2>
            <ul>
                {data !== undefined && data.map((user, index) => (
                    <li key={user.id} data-testid={`user-${user.id}`}>
                        {user.user} - {user.count} posts
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TopUsers;

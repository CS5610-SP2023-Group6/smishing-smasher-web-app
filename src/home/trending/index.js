import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findPostsThunk } from "../../services/posts-thunks";

const TrendingList = () => {
    const { posts, loading, error } = useSelector(state => state.postsData);
    const dispatch = useDispatch();

    useEffect(() => {
        // Dispatch the findPostsThunk to fetch posts when the component mounts
        dispatch(findPostsThunk());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Post List</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>{post.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default TrendingList;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PostDetail = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async (postId) => {
            try {
                const response = await axios.get(`http://localhost:4000/api/posts/?ids=${postId}`);
                console.log(`http://localhost:4000/api/posts/?ids=${postId}`)
                setPost(response.data[0]);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchPost(postId);
    }, [postId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }


    return (
        <div>
            <h1>Post Detail</h1>
            <p>Title: {post.id}</p>
            <p>Content: {post.text}</p>
            {/* Add other post properties as needed */}
        </div>
    );
};

export default PostDetail;

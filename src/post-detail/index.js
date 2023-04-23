import React, {useState, useEffect} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import PostItem from "./post-item";
import HeadBar from "../home/head-bar";
const API_BASE = process.env.REACT_APP_API_BASE;

const PostDetail = () => {
    const {postId} = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async (postId) => {
            try {
                const response = await axios.get(`${API_BASE}/posts/id/${postId}`);
                console.log(response.data);
                setPost(response.data);
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
        <>
        <HeadBar/>
            <br/>
        <PostItem post={post}/>
        </>
    );
};

export default PostDetail;

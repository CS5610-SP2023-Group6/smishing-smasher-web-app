import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findPostsThunk } from "../../services/posts/posts-thunks";

const TrendingList = () => {
    const { posts, loading, error } = useSelector(state => state.postsData);
    const dispatch = useDispatch();

    const [location, setLocation] = useState({});

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                },
                (error) => {
                    console.error("Error retrieving user location:", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    };

    useEffect(() => {
        // Dispatch the findPostsThunk to fetch posts when the component mounts
        dispatch(findPostsThunk());

        // Get user location when the component mounts
        getUserLocation();
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>
                Trending at{" "}
                {location.latitude && location.longitude
                    ? `(${location.latitude.toFixed(2)}, ${location.longitude.toFixed(2)})`
                    : "your location"}
            </h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>{post.text}</li>
                ))}
            </ul>
        </div>
    );
};

export default TrendingList;

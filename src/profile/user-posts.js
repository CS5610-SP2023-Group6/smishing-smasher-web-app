import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

const UserPost = (pidList) => {
    console.log("userposts", pidList)
    const [posts, setPosts] = useState([]);
    // const { pid } = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            // console.log(pidList)
            const response = await axios.get(`http://localhost:4000/api/posts?ids=${pidList.pidList.join(',')}`);
            // console.log(`/api/posts?ids=${pidList.join(',')}`)
            setPosts(response.data);
        };
        fetchPost();
        console.log(posts)
    }, [pidList]);

    return (
        <div>
            {posts.map((post) => (
                <div key={post.id}>
                    <h2>{post.id}</h2>
                    <p>{post.text}</p>
                </div>
            ))}
        </div>
    );
};

export default UserPost;

import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {fetchCurrentUserProfile} from "../services/auth/cur-user-service";
import {findPostsByAuthorId} from "../services/posts/posts-service";
import Filter from "./filter";

const UserPost = (uid) => {

    const [posts, setPosts] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const filterData = (months) => {
        const now = new Date();
        const filtered = posts.filter((item) => {
            const itemDate = new Date(item.time); // Use 'item.time' instead of 'item.datePosted'
            const timeDifference = now - itemDate;
            const monthsDifference = timeDifference / 1000 / 60 / 60 / 24 / 30;

            return monthsDifference <= months;
        });

        setFilteredData(filtered);
    };

    const handleFilter = (months) => {
        filterData(months);

    };
    useEffect(() => {
        const fetchData = async () => {
            // const currentUserProfile = await fetchCurrentUserProfile();
            // console.log("currentUserProfile", currentUserProfile)
            // if (currentUserProfile.status != 403) {
            //
            // const uid = currentUserProfile._id;
            console.log("uid", uid)
            const userPosts = await findPostsByAuthorId(uid.pidList);

            setPosts(userPosts)
            console.log("userPosts", userPosts)
            filterData(1);
        };

        fetchData();
    }, [uid]);

    return (
        <div>
            <div className="col-5"><Filter onFilter={handleFilter} />  </div>
            {posts.map((post) => (
                <div key={post._id}>
                    <h2>{post._id}</h2>
                    <p>{post.text}</p>
                </div>
            ))}
        </div>
    );
};

export default UserPost;

import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {fetchCurrentUserProfile} from "../services/auth/cur-user-service";
import {findPostsByAuthorId} from "../services/posts/posts-service";
import Filter from "./filter";
import TrendingItem from "../home/trending/trending-item";
import PostComponent from "../post/post-component";

const UserPost = (uid) => {

    const [posts, setPosts] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const filterData = (months) => {
        const now = new Date();
        const filtered = posts.filter((item) => {
            const itemDate = new Date(item.createdAt); // Use 'item.time' instead of 'item.datePosted'
            const timeDifference = now - itemDate;
            const monthsDifference = timeDifference / 1000 / 60 / 60 / 24 / 30;
            console.log(months);
            console.log(monthsDifference);
            return monthsDifference <= months;
        });

        setFilteredData(filtered);
    };

    const handleFilter = (months) => {
        filterData(months);
    };

    useEffect(() => {
        const fetchData = async () => {
            const currentUserProfile = await fetchCurrentUserProfile();
            
            const uid = currentUserProfile._id;
            console.log("uid", uid)
            const userPosts = await findPostsByAuthorId(uid);

            setPosts(userPosts)
            setFilteredData(userPosts);
            console.log("userPosts", userPosts)
            filterData(1);
        };

        fetchData();
    }, [uid]);

    return (
        <div>
            <div className="col-5"><Filter onFilter={handleFilter} />  </div>
            {filteredData.length === 0 ? posts.map((post) => (<PostComponent post={post}/>)) : filteredData.map((post) => (<PostComponent post={post} />))}
        </div>
    );
};

export default UserPost;

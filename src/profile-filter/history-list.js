import React, { useState, useEffect } from "react";

import axios from "axios";
import Filter from "../profile/filter";
const API_BASE = process.env.REACT_APP_API_BASE;
const MainComponent = (pidList) => {
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
        const fetchPost = async () => {
            const response = await axios.get(`${API_BASE}/posts?ids=${pidList.pidList.join(',')}`);
            setPosts(response.data);
        };
        fetchPost();
        filterData(1);
    }, [pidList]);
console.log("posts",posts)
    return (
        <div>
            <Filter onFilter={handleFilter} />
            {filteredData.map((post) => ( // Use 'filteredData' instead of 'posts'
                <div key={post.id}>
                    <h2>{post.id}</h2>
                    <p>{post.text}</p>
                </div>
            ))}
        </div>
    );
};

export default MainComponent;

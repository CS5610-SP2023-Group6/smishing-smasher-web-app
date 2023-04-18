import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Filter from "./filter";

const UserPost = (pidList) => {
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
            const response = await axios.get(`http://localhost:4000/api/posts?ids=${pidList.pidList.join(',')}`);
            setPosts(response.data);
        };
        fetchPost();
        filterData(1);
    }, [pidList]);

    return (
        <div>
            <div className="col-5"><Filter onFilter={handleFilter} />  </div>

            {filteredData.map((post) => ( // Use 'filteredData' instead of 'posts'
                <div key={post.id}>
                    <h2>{post.id}</h2>
                    <p>{post.text}</p>
                </div>
            ))}
        </div>
    );
};

export default UserPost;

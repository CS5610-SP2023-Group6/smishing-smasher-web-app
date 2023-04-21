import React, { useState, useEffect } from "react";

import "../vendors/fontawesome/css/all.css";
import "../vendors/bootstrap/css/bootstrap.min.css";
import SearchBar from "./search-bar";
import HeadBar from "./head-bar";
import TrendingList from "./trending";
import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../reducers/posts-reducer";
import { Provider } from "react-redux";
import axios from "axios";

const store = configureStore({ reducer: { postsData: postsReducer } });

const Index = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/users/profile", { withCredentials: true });
                if (response.data.city && response.data.state) {setLoggedIn(true);}
                else {setLoggedIn(false);}


            } catch (error) {
                setLoggedIn(false);
            }
        };

        fetchUserProfile();
    }, []);
console.log(loggedIn)
    return (
        <>
            <Provider store={store}>
                <HeadBar loggedIn={loggedIn} />
                <SearchBar />
                <br />
                <TrendingList loggedIn={loggedIn} />
            </Provider>
        </>
    );
};

export default Index;

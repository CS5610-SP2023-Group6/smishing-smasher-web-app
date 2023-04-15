import React from "react";


import "../vendors/fontawesome/css/all.css"
import "../vendors/bootstrap/css/bootstrap.min.css"
import SearchBar from "./search-bar";
import HeadBar from "./head-bar";
import Trending from "./trending";
import {configureStore} from "@reduxjs/toolkit";
import postsReducer from "../reducers/posts-reducer";
import {Provider} from "react-redux";
const store = configureStore(
    {reducer: {postsData: postsReducer}});

const index = () => {
    return (<>
        <Provider store={store}>
            <HeadBar/>


            <SearchBar/>
            <Trending/>
        </Provider>

    </>);

};
export default index;
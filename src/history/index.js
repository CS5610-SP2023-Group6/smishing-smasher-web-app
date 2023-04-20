
import React from "react";
import HeadBar from "../home/head-bar";
import SearchBar from "../home/search-bar";
import Filter from "../profile/filter";
import MainComponent from "./history-list";

const index = () => {
    return (<>

            <HeadBar/>


            <SearchBar/>
            <br/>
        <MainComponent/>



    </>);

};
export default index;
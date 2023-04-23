import React, { useState, useEffect } from "react";

import "../vendors/fontawesome/css/all.css";
import "../vendors/bootstrap/css/bootstrap.min.css";
import SearchBar from "./search-bar";
import { useNavigate } from "react-router";
import HeadBar from "./head-bar";
import TrendingList from "./trending";
import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../reducers/posts-reducer";
import { Provider } from "react-redux";
import axios from "axios";
import "./index.css";

const store = configureStore({ reducer: { postsData: postsReducer } });
const API_BASE = process.env.REACT_APP_API_BASE;
const Index = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${API_BASE}/users/profile`,
          { withCredentials: true }
        );
        if (response.data.city && response.data.state) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch (error) {
        setLoggedIn(false);
      }
    };

    fetchUserProfile();
  }, []);
  console.log(loggedIn);
  const navigate = useNavigate();
  return (
    <>
      <Provider store={store}>
        <HeadBar loggedIn={loggedIn} />
          <div className="wd-search m-3">
            <button className="wd-button btn btn-primary btn-lg rounded-pill fw-bolder" onClick={() => navigate("/search")}>
              Go To Search!
            </button>
          </div>
        <br />
        <TrendingList loggedIn={loggedIn} />
      </Provider>
    </>
  );
};

export default Index;

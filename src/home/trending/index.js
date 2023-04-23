import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findPostsThunk } from "../../services/posts/posts-thunks";
import axios from "axios";
import TrendingItem from "./trending-item";
import { findAllPosts } from "../../services/posts/posts-service";
import "./index.css";
const API_BASE = process.env.REACT_APP_API_BASE;

const TrendingList = () => {
  // const {posts, loading, error} = useSelector(state => state.postsData);
  const dispatch = useDispatch();

  const [loggedIn, setLoggedIn] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [userProfileData, setUserProfileData] = useState(null);
  const [USAposts, setUSAposts] = useState([]);
  const [localPosts, setLocalPosts] = useState([]);

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

      setUserProfileData(response.data);
      console.log(response.data);

      if (response.data.city && response.data.state) {
        setUserLocation(response.data.city + ", " + response.data.state);
      }
    } catch (error) {
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // Get user location when the component mounts
      await fetchUserProfile();

      const allPosts = await findAllPosts();
      console.log(allPosts);
      if (Array.isArray(allPosts)) {
        setUSAposts(allPosts);
      } else {
        setUSAposts([]);
      }
      // userProfileData.city = "Test City";
      // userProfileData.state = "TT";

      const localPosts = allPosts.filter(
        (post) =>
          post.city === userProfileData.city &&
          post.state === userProfileData.state
      );
      console.log(localPosts);
    };
    // TODO:refactor post Item make it take in a post list
    fetchData();
    console.log(USAposts);
  }, []);

  // if (loading) {
  //     return <div>Loading...</div>;
  // }
  //
  // if (error) {
  //     return <div>Error: {error}</div>;
  // }

  return (
    <div className="wd-bg border border-2 p-5 rounded">
      <div className="row">
        <div className="col-md-6">
          <h3>
            Top smishing at{" "}
            <span className="text-danger">
              {userLocation ? userLocation : "your location"}
            </span>
          </h3>
          {USAposts.sort((a, b) => {
            const aT = new Date(a.createdAt);
            const bT = new Date(b.createdAt);
            // console.log(aT);
            // console.log(bT);
            return bT - aT;
          })
            .filter((post) => ((post.city) + ", " + (post.state) === userLocation))
            .slice(0, 5)
            .map((post) => (
              <TrendingItem post={post} />
            ))}
            ...
        </div>
        <div className="col-md-6">
          <h3>
            Top smishing in <span className="text-danger"> USA</span>
          </h3>
          {USAposts.sort((a, b) => {
            const aT = new Date(a.createdAt);
            const bT = new Date(b.createdAt);
            // console.log(aT);
            // console.log(bT);
            return bT - aT;
          })
            .slice(0, 5)
            .map((post) => (
              <TrendingItem post={post} />
            ))}
            ...
        </div>
      </div>
    </div>
  );
};

export default TrendingList;

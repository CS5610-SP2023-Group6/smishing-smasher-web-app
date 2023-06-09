import SearchBar from "../home/search-bar";
import HeadBar from "../home/head-bar";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PostComponent from "../post/post-component";
import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const Search = () => {
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const search = useSelector((state) => state.search);
  const searching = async (text) => {
    const api = axios.create({ withCredentials: true });
    const res = await api.post(`${API_BASE}/posts/content`, {
      title: text,
      spamText: text,
      description: text,
    });
    return res.data;
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await searching(search.text);
      setPosts([]);
      setPosts(fetchedPosts);
    };
    fetchPosts();
  }, [search.text, location]);

  console.log("posts: \n", posts);
  return (
    <>
      <HeadBar />
      <SearchBar />
      <div>
        {posts.sort((a, b) => {
            const aT = new Date(a.createdAt);
            const bT = new Date(b.createdAt);
            console.log(aT);
            console.log(bT);
            return bT - aT;
          }).map((post) => (
          <PostComponent post={post} />
        ))}
      </div>
    </>
  );
};

export default Search;

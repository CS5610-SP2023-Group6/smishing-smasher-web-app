import SearchBar from "../home/search-bar";
import HeadBar from "../home/head-bar";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import PostComponent from "../post/post-component";
import axios from "axios";

const Search = () => {
  const [posts, setPosts] = useState([]);
  const search = useSelector((state) => state.search);
  const searching = async (text) => {
    const api = axios.create({ withCredentials: true });
    const res = await api.post("http://localhost:4000/api/posts/content", {
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
  }, [search.text]);

  console.log("posts: \n", posts);
  return (
    <>
      <HeadBar />
      <SearchBar />
      <div>
        {posts.map((post) => (
          <PostComponent post={post} />
        ))}
      </div>
    </>
  );
};

export default Search;

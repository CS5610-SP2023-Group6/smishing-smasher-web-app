import axios from "axios";
import { useParams } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
import UpdateComponent from "./component";

const EditPost = () => {
  const { pid } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    const fectchData = async () => {
      const api = axios.create({ withCredentials: true });
      const res = await api.get(`http://localhost:4000/api/posts/id/${pid}`);
      setPost(res.data);
      console.log(post);
    };
    fectchData();
  }, []);

  // console.log("post: ", post);
  return <>{Object.keys(post).length > 0 && <UpdateComponent post={post} />}</>;
};

export default EditPost;

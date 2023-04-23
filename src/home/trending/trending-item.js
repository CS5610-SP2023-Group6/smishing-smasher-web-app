import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TrendingItem = ({ post }) => {
  const [avatar, setAvatar] = useState("");
  const time = new Date(post.createdAt);

  useEffect(() => {
    const getAvatar = async () => {
      const api = axios.create({ withCredentials: true });
      const res = await api.get(
        `http://localhost:4000/api/users/id/${post.authorID}`
      );
      if (res.data.profilePicture !== undefined) {
        setAvatar(`http://localhost:4000/api/files/${res.data.profilePicture}`);
      } else {
        setAvatar(`http://localhost:4000/api/files/6442a2dc66674f9ee9472690`);
      }
    };

    getAvatar();
  }, []);

  return (
    <Link to={`/post/${post._id}`} className="text-decoration-none text-reset">
      <li className="list-group-item">
        <div className="row">
          <div className="col-2">
            <img
              className="float-end rounded-pill"
              height="60px"
              src={avatar}
            />
          </div>
          <div className="col-10">
            <div>
              <div>
                <span className="fw-bolder">{post.title} </span>
                <span className="text-secondary">
                  {post.city}, {post.state}
                </span>
              </div>
              <span className="text-secondary">
                {time.getFullYear()}-{time.getMonth()}-{time.getDate()}&nbsp;
                {time.getHours()}:{time.getMinutes()}:{time.getSeconds()}
              </span>
              <i className="bi bi-x-lg float-end"></i>
            </div>
            <div className="row text-muted">
              <div className="col-2">
                <i className="fa fa-tag"></i> {post.tags}
              </div>
            </div>
            <div className="mb-1">{post.description}</div>
            <div className="mb-1">{post.spamText}</div>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default TrendingItem;

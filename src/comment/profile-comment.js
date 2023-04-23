import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../login/auth-context";
import { isLoggedInService } from "../services/auth/is-logged-in";
import {
  createComment,
  findCommentById,
  findCommentsByAuthorId,
  updateComment,
} from "../services/comment-service"; // Import 'findCommentsByUserId'
import { fetchCurrentUserProfile } from "../services/cur-user-service";
import { findUserById } from "../services/user-service";
import { updatePost } from "../services/posts/posts-service";
import Filter from "../profile/filter";
import "./index.css";
const API_BASE = process.env.REACT_APP_API_BASE;
const CommentItem = ({ uid }) => {
  const [comments, setComments] = useState([]); // Create a state for comments
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [commentAuthor, setCommentAuthor] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const filterData = (months) => {
    const now = new Date();
    const filtered = comments.filter((item) => {
      const itemDate = new Date(item.createdAt); // Use 'item.time' instead of 'item.datePosted'
      const timeDifference = now - itemDate;
      const monthsDifference = timeDifference / 1000 / 60 / 60 / 24 / 30;
      console.log(months);
      console.log(monthsDifference);
      return monthsDifference <= months;
    });

    setFilteredData(filtered);
  };

  const handleFilter = (months) => {
    filterData(months);
  };

  console.log("uid, profile-comment", uid);
  useEffect(() => {
    const fetchData = async () => {
      const currentUserProfile = await fetchCurrentUserProfile();
      console.log("uid, profile-comment", uid);

      const api = axios.create({ withCredentials: true });
      const res = await api.get(`${API_BASE}/users/id/${uid}`);

      if (res.data.profilePicture !== undefined) {
        setAvatar(`${API_BASE}/files/${res.data.profilePicture}`);
      } else {
        setAvatar(`${API_BASE}/files/6442a2dc66674f9ee9472690`);
      }
      const userComments = await findCommentsByAuthorId(uid); // Get user's comments by 'uid'
      setComments(userComments); // Set the state with fetched comments

      const isLoggedIn = await isLoggedInService();
      setLoggedIn(isLoggedIn);

      const curUser = await fetchCurrentUserProfile();
      setUser(curUser);
    };

    fetchData();
  }, [uid]);

  return (
    <div>
      {comments.length === 0 ? (
        <div>No comments found.</div>
      ) : (
        <div>
          <div className="col-5">
            <Filter onFilter={handleFilter} />
          </div>
          {comments.map((comment) => {
            const time = new Date(comment.createdAt);
            return (
              <div key={comment._id}>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-1">
                      <img
                        className="float-end rounded-pill border border-1"
                        height="40px"
                        src={avatar}
                      />
                    </div>
                    <div className="col-10">
                      <div>
                        <span className="wd-time mb-1 rounded p-1">
                          {time.getFullYear()}-{time.getMonth()}-
                          {time.getDate()}
                          &nbsp;
                          {time.getHours()}:{time.getMinutes()}:
                          {time.getSeconds()}&nbsp;
                        </span>
                      </div>
                      <div className="my-2 fw-bold">{comment.text}</div>
                    </div>
                    <hr />
                  </div>
                </li>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CommentItem;

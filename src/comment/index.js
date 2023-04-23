import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../login/auth-context";
import { isLoggedInService } from "../services/auth/is-logged-in";
import {
  createComment,
  findCommentById,
  updateComment,
} from "../services/comment-service";
import { fetchCurrentUserProfile } from "../services/cur-user-service";
import { findUserById } from "../services/user-service";
import { updatePost } from "../services/posts/posts-service";
import "./index.css";
const API_BASE = process.env.REACT_APP_API_BASE;
const CommentItem = ({ commentId }) => {
  const [comment, setComment] = useState(null);
  const [author, setAuthor] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likesCount, setLikesCount] = useState(null);
  const [dislikesCount, setDislikesCount] = useState(null);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [commentAuthor, setCommentAuthor] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [time, setTime] = useState(null);

  console.log("comment", commentId);

  useEffect(() => {
    const fetchData = async () => {
      const cmt = await findCommentById(commentId);
      setComment(cmt);
      setTime(new Date(cmt.createdAt));

      const isLoggedIn = await isLoggedInService();
      setLoggedIn(isLoggedIn);

      const curUser = await fetchCurrentUserProfile();
      setUser(curUser);

      const api = axios.create({ withCredentials: true });
      const res = await api.get(
        `${API_BASE}/users/id/${cmt.authorID}`
      );

      if (res.data.profilePicture !== undefined) {
        setAvatar(`${API_BASE}/files/${res.data.profilePicture}`);
        setAuthor(res.data.nickname);
      } else {
        setAvatar(`${API_BASE}/files/6442a2dc66674f9ee9472690`);
      }

      setLikesCount(cmt.thumbUp);
      setDislikesCount(cmt.thumbDown);
    };

    fetchData();
  }, []);

  const handleButtonClick = () => {
    console.log("handleButtonClick", loggedIn);
    if (!loggedIn) {
      navigate("/login");
    } else {
      setShowCommentInput(true);
    }
  };

  const createCommentHere = async () => {
    try {
      const newComment = {
        authorID: user._id,
        postID: comment.postID,
        text: commentText,
      };
      console.log("newComment", newComment);
      const response = await createComment(newComment);
      console.log(response.data);
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  const updateClick = async (action) => {
    try {
      const updatedComment = { ...comment };
      if (action === "like") {
        if (liked) {
          updatedComment.thumbUp -= 1;
          setLikesCount(likesCount - 1);
        } else {
          updatedComment.thumbUp += 1;
          setLikesCount(likesCount + 1);
        }
        setLiked(!liked);
      } else if (action === "dislike") {
        if (disliked) {
          updatedComment.thumbDown -= 1;
          setDislikesCount(dislikesCount - 1);
        } else {
          updatedComment.thumbDown += 1;
          setDislikesCount(dislikesCount + 1);
        }
        setDisliked(!disliked);
      }
      console.log("updatedComment", updatedComment);
      const response = await updateComment(updatedComment);
      console.log("res update cmt", response.data);
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  return comment ? (
    <div className="wd-comment rounded p-2">
      <li className="list-group-item">
        <div className="row">
          <div className="col-1">
            <img
              className="float-end rounded-pill border border-1"
              height="30px"
              src={avatar}
            />
          </div>
          <div className="col-10">
            <div className="mb-1">
                <span className="wd-author me-1">{author}</span>
                <span className="wd-time rounded px-1">{time.getFullYear()}-
                  {time.getMonth()}-{time.getDate()}&nbsp;{time.getHours()}:
                  {time.getMinutes()}:{time.getSeconds()}</span>
            </div>
            <div className="my-3 fw-bold">{comment.text}</div>
            <div className="wd-interaction row text-muted">
              <div className="col-2">
                <i
                  className={`far fa-thumbs-up${liked ? " text-primary" : ""}`}
                  onClick={() => updateClick("like")}
                />
                Likes: {likesCount}
              </div>
              <div className="col-2">
                <i
                  className={`far fa-thumbs-down${
                    disliked ? " text-primary" : ""
                  }`}
                  onClick={() => updateClick("dislike")}
                ></i>
                Dislikes: {dislikesCount}
              </div>
            </div>
          </div>
        </div>
      </li>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default CommentItem;

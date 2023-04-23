import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../login/auth-context";
import { isLoggedInService } from "../services/auth/is-logged-in";
import { updatePost } from "../services/posts/posts-service";
import { Link } from "react-router-dom";

const PostComponent = ({ post }) => {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [received, setReceived] = useState(false);
  const [likesCount, setLikesCount] = useState(post.thumbUp);
  const [dislikesCount, setDislikesCount] = useState(post.thumbDown);
  const [receivedCount, setReceivedCount] = useState(post.endorsement);
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const checkLoginStatus = async () => {
      const isLoggedIn = await isLoggedInService();
      setLoggedIn(isLoggedIn);
    };

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
      console.log(avatar);
    };

    checkLoginStatus();
    getAvatar();
  }, []);

  const handleButtonClick = () => {
    if (!loggedIn) {
      navigate("/login");
    }
  };
  const createComment = async () => {
    try {
      const newComment = {
        authorID: "", // Set the authorID based on your authentication system
        postID: post._id,
        text: commentText,
      };
      const response = await axios.post(
        "http://localhost:4000/api/comments/create",
        newComment
      );
      console.log(response.data);
      // Add any necessary actions to update the UI, e.g., append the new comment to the post.comments list
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  const updateClick = async (action) => {
    try {
      const updatedPost = { ...post };
      if (action === "like") {
        if (liked) {
          updatedPost.thumbUp -= 1;
          setLikesCount(likesCount - 1);
        } else {
          updatedPost.thumbUp += 1;
          setLikesCount(likesCount + 1);
        }
        setLiked(!liked);
      } else if (action === "dislike") {
        if (disliked) {
          updatedPost.thumbDown -= 1;
          setDislikesCount(dislikesCount - 1);
        } else {
          updatedPost.thumbDown += 1;
          setDislikesCount(dislikesCount + 1);
        }
        setDisliked(!disliked);
      } else if (action === "received") {
        if (received) {
          updatedPost.endorsement -= 1;
          setReceivedCount(receivedCount - 1);
        } else {
          updatedPost.endorsement += 1;
          setReceivedCount(receivedCount + 1);
        }
        setReceived(!received);
      }
      console.log("updatedpost", updatedPost);
      const response = await updatePost(updatedPost);
      console.log(response.data);
      // Add any necessary actions to update the UI
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

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
              <span className="fw-bolder">{post.title} </span>
              <span className="text-secondary">
                {post.city}, {post.state} - {post.createdAt}
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

            <div className="row text-muted">
              <div className="col-2">
                <i className="fa fa-comment" onClick={handleButtonClick}></i>{" "}
                {post.comments.length}
              </div>
              <div className="col-2">
                <i
                  className={`far fa-thumbs-up${liked ? " text-primary" : ""}`}
                  onClick={() => updateClick("like")}
                ></i>
                Likes: {likesCount}
              </div>
              <div className="col-2">
                <i
                  className={`far fa-thumbs-down${
                    disliked ? " text-primary" : ""
                  }`}
                  onClick={() => updateClick("dislike")}
                ></i>
                Unlikes: {dislikesCount}
              </div>
              <div className="col-2">
                <i
                  className={`fa fa-envelope-open-text${
                    received ? " text-primary" : ""
                  }`}
                  onClick={() => updateClick("received")}
                ></i>
                Received: {receivedCount}
              </div>
            </div>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default PostComponent;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../login/auth-context";
import { isLoggedInService } from "../services/auth/is-logged-in";
import { updatePost } from "../services/posts/posts-service";
import { createComment } from "../services/comment-service";
import { fetchCurrentUserProfile } from "../services/cur-user-service";
import { findUserById } from "../services/user-service";
import CommentItem from "../comment";
import "./post.css";
const API_BASE = process.env.REACT_APP_API_BASE;

const PostItem = ({ post }) => {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [authorName, setAuthorName] = useState("");
  const [role, setRole] = useState("");
  const [canEdit, setCanEdit] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [received, setReceived] = useState(false);
  const [likesCount, setLikesCount] = useState(post.thumbUp);
  const [dislikesCount, setDislikesCount] = useState(post.thumbDown);
  const [receivedCount, setReceivedCount] = useState(post.endorsement);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [postAuthor, setPostAuthor] = useState(null);
  const [avatar, setAvatar] = useState("");
  const time = new Date(post.createdAt);
  const [commentList, setCommentList] = useState(post.comments);

  useEffect(() => {
    const getAvatar = async () => {
      const api = axios.create({ withCredentials: true });
      const res = await api.get(
        `${API_BASE}/users/id/${post.authorID}`
      );
      if (res.data.profilePicture !== undefined) {
        setAvatar(`${A}/files/${res.data.profilePicture}`);
        setAuthorName(res.data.nickname);
        const curUser = await fetchCurrentUserProfile();
        setRole(curUser.role);
        console.log("User Role: ", role);
        if (
          curUser._id === post.authorID ||
          role === "admin" ||
          role === "owner"
        ) {
          setCanEdit(true);
        }
      } else {
        setAvatar(`${API_BASE}/files/6442a2dc66674f9ee9472690`);
      }
    };
    const checkLoginStatus = async () => {
      const isLoggedIn = await isLoggedInService();
      setLoggedIn(isLoggedIn);
      const curUser = await fetchCurrentUserProfile();
      setUser(curUser);
      const curAuthor = await findUserById(post.authorID);
      console.log(post.authorID);
      console.log("pitem curauthor", curAuthor);
      setPostAuthor(curAuthor);
      console.log("postAuthor", postAuthor);
    };

    checkLoginStatus();
    getAvatar();
    console.log("user ", user);
    console.log("author ", postAuthor);
  }, [role]);

  const handleDeleteButtonClick = async () => {
    const api = axios.create({ withCredentials: true });
    api.post(`${API_BASE}/posts/delete`, {
      _id: post._id,
    });
    navigate("/home");
  };

  const EditButtons = () => {
    return (
      <>
        <button
          className="btn btn-secondary me-2"
          onClick={() => navigate(`/edit-post/${post._id}`)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger me-2"
          onClick={handleDeleteButtonClick}
        >
          Delete
        </button>
      </>
    );
  };

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
        postID: post._id,
        text: commentText,
      };
      console.log("newComment", newComment);
      const response = await createComment(newComment);
      console.log(response.data);

      // Update the comment list and clear the input field
      setCommentList([...commentList, response.data]);
      setCommentText("");
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
    <div className="wd-post m-3 p-2 rounded">
      <li className="list-group-item">
        <div className="row">
          <div className="col-2">
            <img
              className="float-end rounded-pill border border-1"
              height="40px"
              src={avatar}
            />
          </div>
          <div className="col-8">
            <div>
              <div className="wd-user">
                <div>
                  <span className="fw-bolder">{authorName} </span>
                </div>
                <span className="text-secondary">
                  {post.city}, {post.state} - {time.getFullYear()}-
                  {time.getMonth()}-{time.getDate()}&nbsp;{time.getHours()}:
                  {time.getMinutes()}:{time.getSeconds()}
                </span>
              </div>
            </div>
          </div>
          <div className="col-2 mt-3">
            {role !== "" && (canEdit ? <EditButtons /> : <></>)}
          </div>
        </div>
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
            <div className="mb-1 fw-bold fs-3">{post.title}</div>
            <span className="wd-phone mb-1 p-1 rounded fw-bold">
              {post.phone}
            </span>
            <div className="wd-spam my-1 p-1 rounded">{post.spamText}</div>
            <div className="mb-1">{post.description}</div>
            <div className="mb-1">{post.spamText}</div>
            <div className="row">
              {showCommentInput && (
                <div className="my-2">
                  <div className="input-group">
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="Enter your comment"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={createCommentHere}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="row text-muted">
              <div className="col-2">
                <i className="fa fa-comment" onClick={handleButtonClick}></i>
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
              {post.comments.map(
                (comment) => (
                  console.log("comment", comment),
                  (
                    <div className="row comment">
                      <hr />
                      {comment.text}
                      <CommentItem commentId={comment} />
                    </div>
                  )
                )
              )}
            </div>
          </div>
        </div>
      </li>
    </div>
  );
};

export default PostItem;

import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../login/auth-context";

const PostItem = ({post}) => {
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [received, setReceived] = useState(false);
    const [likesCount, setLikesCount] = useState(post.thumbUp);
    const [dislikesCount, setDislikesCount] = useState(post.thumbDown);
    const [receivedCount, setReceivedCount] = useState(post.endorsement);
    const navigate = useNavigate();
    const { loggedIn } = useAuth();

    // useEffect(() => {
    //     const checkLoginStatus = async () => {
    //         try {
    //             const response = await axios.get("http://localhost:4000/api/users/profile");
    //
    //
    //             console.log(response);
    //             setIsLoggedIn(response.data.status === 200);
    //         } catch (error) {
    //             setIsLoggedIn(false);
    //         }
    //     };
    //
    //     checkLoginStatus();
    //
    // }, []);
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
            const response = await axios.post("http://localhost:4000/api/comments/create", newComment);
            console.log(response.data);
            // Add any necessary actions to update the UI, e.g., append the new comment to the post.comments list
        } catch (error) {
            console.error("Error creating comment:", error);
        }
    };

    const updatePost = async (action) => {
        try {
            const updatedPost = {...post};
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
            const response = await axios.post("http://localhost:4000/api/posts/update", updatedPost);
            console.log(response.data);
            // Add any necessary actions to update the UI
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    return (
        <li className="list-group-item">
            <div className="row">
                <div className="col-2">
                    <img
                        className="float-end rounded-pill"
                        height="60px"
                        // src={post.photos[0]}
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
                            <i className="fa fa-comment" onClick={handleButtonClick}></i> {post.comments.length}
                        </div>
                        <div className="col-2">
                            <i className="far fa-thumbs-up" onClick={handleButtonClick}></i>
                            Likes: {post.thumbUp}
                        </div>
                        <div className="col-2">
                            <i className="far fa-thumbs-down" onClick={handleButtonClick}></i>
                            Unlikes: {post.thumbDown}
                        </div>
                        <div className="col-2">
                            <i className="fa fa-envelope-open-text" onClick={handleButtonClick}></i>
                            Received: {post.endorsement}
                        </div>
                    </div>
                </div>
            </div>

        </li>
    );
};

export default PostItem;

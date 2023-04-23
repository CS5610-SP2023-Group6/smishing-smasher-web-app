import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../login/auth-context";
import {isLoggedInService} from "../services/auth/is-logged-in";
import {updatePost} from "../services/posts/posts-service";
import {createComment} from "../services/comment-service";
import {fetchCurrentUserProfile} from "../services/cur-user-service";
import {findUserById} from "../services/user-service";
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
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [postAuthor, setPostAuthor] = useState(null);
    const [avatar, setAvatar] = useState("");
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
        const checkLoginStatus = async () => {
            const isLoggedIn = await isLoggedInService();
            setLoggedIn(isLoggedIn);
            const curUser = await fetchCurrentUserProfile();
            setUser(curUser);
            const curAuthor = await findUserById(post.authorID);
            console.log(post.authorID)
            console.log("pitem curauthor",curAuthor)
            setPostAuthor(curAuthor);
            console.log("postAuthor", postAuthor);
        };


        checkLoginStatus();
        getAvatar();
    }, []);

    const handleButtonClick = () => {
        console.log("handleButtonClick", loggedIn)
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
                postID: post._id, text: commentText,
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
            console.log("updatedpost", updatedPost);
            const response = await updatePost(updatedPost);
            console.log(response.data);
            // Add any necessary actions to update the UI
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    return (<li className="list-group-item">

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
                        {post.comments.map((comment) => (
                            <div key={comment._id} className="comment">
                                {comment.text}
                                {/* Render the comment content here, e.g., comment.text */}
                            </div>
                        ))}

                    </div>



                <div className="col-2">
                        <i className={`far fa-thumbs-up${liked ? ' text-primary' : ''}`}
                           onClick={() => updateClick('like')}></i>
                        Likes: {likesCount}
                    </div>
                    <div className="col-2">
                        <i className={`far fa-thumbs-down${disliked ? ' text-primary' : ''}`}
                           onClick={() => updateClick('dislike')}></i>
                        Unlikes: {dislikesCount}
                    </div>
                    <div className="col-2">
                        <i className={`fa fa-envelope-open-text${received ? ' text-primary' : ''}`}
                           onClick={() => updateClick('received')}></i>
                        Received: {receivedCount}
                    </div>
                </div>
            </div>
        </div>

    </li>);
};

export default PostItem;

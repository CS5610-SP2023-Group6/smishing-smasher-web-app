import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../login/auth-context";
import { isLoggedInService } from "../services/auth/is-logged-in";
import {createComment, findCommentById, findCommentsByAuthorId, updateComment} from "../services/comment-service"; // Import 'findCommentsByUserId'
import { fetchCurrentUserProfile } from "../services/cur-user-service";
import { findUserById } from "../services/user-service";
import {updatePost} from "../services/posts/posts-service";

const CommentItem = ({ uid }) => {

    const [comments, setComments] = useState([]); // Create a state for comments
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [commentAuthor, setCommentAuthor] = useState(null);
    const [avatar, setAvatar] = useState("");



    console.log("uid, profile-comment", uid);
    useEffect(() => {
        const fetchData = async () => {
            const currentUserProfile = await fetchCurrentUserProfile();
            console.log("uid, profile-comment", uid);

            const api = axios.create({ withCredentials: true });
            const res = await api.get(`http://localhost:4000/api/users/id/${uid}`);

            if (res.data.profilePicture !== undefined) {
                setAvatar(`http://localhost:4000/api/files/${res.data.profilePicture}`);
            } else {
                setAvatar(`http://localhost:4000/api/files/6442a2dc66674f9ee9472690`);
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
                comments.map((comment) => (
                    <div key={comment._id}>
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
                                    <div className="mb-1">{comment.text}</div>

                                </div>
                            </div>
                        </li>
                    </div>
                ))
            )}
        </div>
    );
};

export default CommentItem;

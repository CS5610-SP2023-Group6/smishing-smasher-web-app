import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../vendors/bootstrap/css/bootstrap.min.css";
import "../vendors/fontawesome/css/all.min.css";
const PostDetail = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async (postId) => {
            try {
                // TODO: dont hardcode the url
                const response = await axios.get(`http://localhost:4000/api/posts/${postId}`);
                // console.log(`http://localhost:4000/api/posts/?ids=`)
                setPost(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchPost(postId);
    }, [postId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }


    // return (
    // import { useDispatch } from "react-redux";
    // import { deleteTuitThunk, updateTuitThunk } from "../../services/tuits-thunks";
    //
    // const Tuitpost = ({ post }) => {
    //     const dispatch = useDispatch();
    //
    //     const deleteTuitHandler = (id) => {
    //         dispatch(deleteTuitThunk(id));
    //     };

        return (
            <li className="list-group-item">
                <div className="row">
                    <div className="col-2">
                        {/* Replace with the appropriate image URL */}
                        <img
                            alt="homepost"
                            className="float-end rounded-pill"
                            height="60px"
                            src={post.photos[0]}
                        />
                    </div>
                    <div className="col-10">
                        <div>
                            <span className="fw-bolder">{post.title} </span>{" "}
                            <span className="text-secondary">
              {post.city}, {post.state} - {post.createdAt}
            </span>
                            <i
                                className="bi bi-x-lg float-end"
                                // onClick={() => deleteTuitHandler(post._id)}
                            ></i>
                        </div>
                        <div className="mb-1">{post.description}</div>

                        <div className="row text-muted">
                            <div className="col-2">
                                <i className="bi bi-chat"></i> {post.comments.length}
                            </div>
                            <div className="col-2">
                                <i className="bi bi-layer-forward"></i> {post.endorsement}
                            </div>
                            <div className="col-2">
                                Likes: {post.thumbUp}
                                <i
                                    // onClick={() =>
                                    //     dispatch(
                                    //         updateTuitThunk({
                                    //             ...post,
                                    //             thumbUp: post.thumbUp + 1,
                                    //         })
                                    //     )
                                    // }
                                    className="bi bi-heart-fill me-2 text-danger"
                                ></i>
                            </div>
                            <div className="col-2">
                                Unlikes: {post.thumbDown}
                                <i
                                    // onClick={() =>
                                        // dispatch(
                                        //     updateTuitThunk({
                                        //         ...post,
                                        //         thumbDown: post.thumbDown + 1,
                                        //     })
                                        // )
                                    // }
                                    className="bi bi-hand-thumbs-down"
                                ></i>
                            </div>
                            <div className="col">
                                <i className="bi bi-share"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        );
    };



export default PostDetail;

import {useDispatch} from "react-redux";
import PostDetail from "../../post-detail";
import React from "react";
import {Link} from 'react-router-dom';


const TrendingItem = ({post}) => {

    return (
        <Link to={`/post/${post._id}`} className="text-decoration-none text-reset">
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


                    </div>
                </div>

            </li>
        </Link>
    );


};
export default TrendingItem;
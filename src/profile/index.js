import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import NavigationBar from "./nav-bar";
import UserPosts from "./user-posts";
import UserPost from "./user-posts";

const UserProfile = () => {
    const { userId } = useParams(); // Destructure userId from useParams
    console.log("userId", userId)
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async (userId) => {
            try {
                const response = await axios.get(`http://localhost:4000/api/users/${userId}`);
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchUser(userId); // Pass userId as an argument to fetchUser
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    console.log("user",user.posts)
    // const pidList =
        return (



            <>
                <div className="position-relative">
                    <div className="row">
                        <i className="col col-1 bi bi-arrow-left fs-4"></i>

                        <div className="col "><span className="fs-4 fw-bold">{user.firstName} {user.lastName}</span>
                            <div className="text-secondary">{user.posts.length} Posts</div>
                        </div>
                    </div>
                    {/*<img src={user.bannerPicture} width="100%" height="200px"/>*/}
                    <div className="row">
                        <div className="col col-7">
                            <img className="position-absolute rounded-circle bottom-0 start-0 ms-3"
                                 height="100px" src={user.userPicture}/>
                        </div>
                        <div className="col">

                            <Link to="/tuiter/edit-user" >
                                <button className="btn border border-dark fw-bold rounded-pill float-end mt-3">
                                    Edit Profile
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="fs-4 fw-bold">{user.firstName} {user.lastName}</div>
                    <div className="text-secondary">{user.handle}</div>

                    <div className="mt-3">{user.bio}</div>
                    <div className="text-secondary mt-3">
                        <i className="bi bi-geo-alt"></i><span className="ms-2">{user.location}</span>
                        {/*<i className="bi bi-balloon ms-2"></i><span>Born {user.dateOfBirth}</span>*/}
                        <i className="bi bi-calendar3 ms-2"></i><span className="ms-2">Joined {user.dateJoined}</span>
                    </div>
                    <div className="mt-3">
                        <span className="text-secondary fw-bold">Following</span> <span class="">{user.following}</span>
                        {/*<span class="fw-bold ms-3">{user.followersCount}</span> <span*/}
                        {/*class="text-secondary">Followers</span>*/}
                    </div>
                </div>
                <NavigationBar/>


                <UserPost pidList={user.posts}/>


            </>

    );
};

export default UserProfile;


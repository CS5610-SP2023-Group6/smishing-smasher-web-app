import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import NavigationBar from "./nav-bar";
import UserPost from "./user-posts";
import HeadBar from "../home/head-bar";

const UserProfile = () => {
  const { userId } = useParams(); // Destructure userId from useParams
  console.log("userId", userId);
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState("6442a2dc66674f9ee9472690");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCurUser, setIsCurUser] = useState(false);

  const fetchCurUserId = async (userId) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/users/profile",
        { withCredentials: true }
      );
      if (response.data._id === userId) {
        setIsCurUser(true);
      } else {
        setIsCurUser(false);
      }

      console.log(response.data);
    } catch (error) {
      setIsCurUser(false);
    }
  };
  const fetchUser = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/users/id/${userId}`
      );
      console.log("response", response.data);
      setUser(response.data);
      if (response.data.profilePicture !== null) {
          setAvatar(response.data.profilePicture);
      }
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUser(userId); // Pass userId as an argument to fetchUser
      await fetchCurUserId(userId);

      // console.log("user", user)
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  console.log("user", user);
  console.log("isCurUser", isCurUser);
  // const pidList =
  return (
    <>
      <HeadBar />
      <div className="position-relative">
        <div className="row">
          <div className="col-1">
            <img
              className="float-end rounded-pill"
              height="60px"
              src={`http://localhost:4000/api/files/${avatar}`}
            />
          </div>
          <div className="col ">
            <span className="fs-4 fw-bold">{user.nickname}</span>
            <div className="text-secondary">{user.email} </div>
            <div className="text-secondary">{user.posts.length} Posts</div>
          </div>
          {isCurUser && (
            <>
              <div className="col">
                <Link to={`/edit-profile/${userId}`}>
                  <button className="btn border border-dark fw-bold rounded-pill float-end mt-3">
                    Edit Profile
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
        {/*<img src={user.bannerPicture} width="100%" height="200px"/>*/}
        {/*<div className="row">*/}
        {/*    /!*<div className="col col-7">*!/*/}
        {/*    /!*    <img className="position-absolute rounded-circle bottom-0 start-0 ms-3"*!/*/}
        {/*    /!*         height="100px" src={user.profilePicture}/>*!/*/}
        {/*    /!*</div>*!/*/}
        {/*    <div className="col">*/}

        {/*        {isCurUser && (<button onClick={handleLogout} className="btn btn-primary">*/}
        {/*            Log Out*/}
        {/*        </button>)}*/}
        {/*    </div>*/}
        {/*</div>*/}

        {/*<div className="fs-4 fw-bold">{user.firstName} {user.lastName}</div>*/}
        {/*<div className="text-secondary">{user.handle}</div>*/}

        <div className="mt-3">{user.bio}</div>
        <div className="text-secondary mt-3">
          <i className="bi bi-geo-alt"></i>
          <span className="ms-2">{user.location}</span>
          {/*<i className="bi bi-balloon ms-2"></i><span>Born {user.dateOfBirth}</span>*/}
          <i className="bi bi-calendar3 ms-2"></i>
          <span className="ms-2">Joined {user.dateJoined}</span>
        </div>
        <div className="mt-3">
          <span className="text-secondary fw-bold">Following</span>{" "}
          <span class="">{user.following}</span>
          {/*<span class="fw-bold ms-3">{user.followersCount}</span> <span*/}
          {/*class="text-secondary">Followers</span>*/}
        </div>
      </div>
      <br />
      <NavigationBar />

      <UserPost pidList={userId} />
    </>
  );
};

export default UserProfile;

import React, { useState, useEffect } from "react";
import { fetchCurrentUserProfile } from "../services/cur-user-service";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import NavigationBar from "./nav-bar";
import UserPost from "./user-posts";
import HeadBar from "../home/head-bar";
import "../vendors/fontawesome/css/all.css";
import "../vendors/bootstrap/css/bootstrap.min.css";

const UserProfile = () => {
  const { userId } = useParams(); // Destructure userId from useParams
  const [followed, setFollowed] = useState(false);
  const [isMe, setIsMe] = useState(true);
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

  const handleOnClickFollow = async () => {
    if (!followed) {
      const api = axios.create({ withCredentials: true });
      const res = api.post("http://localhost:4000/api/users/following", {
        _id: userId,
      });
      setFollowed(true);
    } else {
      const api = axios.create({ withCredentials: true });
      const res = api.post("http://localhost:4000/api/users/unfollowing", {
        _id: userId,
      });
      setFollowed(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // await fetchUser(userId); // Pass userId as an argument to fetchUser
      await fetchCurUserId(userId);
      const current = await fetchCurrentUserProfile();
      if (current._id !== userId) {
        setIsMe(false);
        if (current.following.indexOf(userId) !== -1) {
          setFollowed(true);
        }
      }

      // console.log("user", user)
    };

    fetchData();
  }, [userId, followed]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const Edit = () => {
    return (
      <Link to={`/edit-profile/${userId}`}>
        <button className="btn border border-dark fw-bold rounded-pill float-end mt-3">
          Edit Profile
        </button>
      </Link>
    );
  };

  const Follow = () => {
    return (
      <button
        className="btn border border-dark fw-bold rounded-pill float-end mt-3"
        onClick={handleOnClickFollow}
      >
        {followed ? "Unfollow" : "Follow"}
      </button>
    );
  };

  const time = new Date(user.birthday);

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
              <div className="col">{isMe ? <Edit /> : <Follow />}</div>
            </>
          )}
        </div>

        <div
          id="bio"
          className="m-3 border border-1 p-2 rounded bg-secondary text-white"
        >
          {user.bio}
        </div>
        <div className="mx-3 text-secondary mt-3">
          <i className="bi bi-geo-alt"></i>
          <span className="ms-2">
            {user.city}, {user.state}
          </span>
          {/*<i className="bi bi-balloon ms-2"></i><span>Born {user.dateOfBirth}</span>*/}
          <i className="bi bi-calendar3 ms-2"></i>
          <span className="ms-2">
            {time.getFullYear()}-{time.getMonth()}-{time.getDate()}{" "}
          </span>
          <i className="bi bi-cursor"></i>
          <span className="ms-2">{user.website} </span>
        </div>
        <div className="mt-3 ms-3">
          <span className="text-secondary fw-bold">Following</span>{" "}<span className="fw-bold">{user.following.length}</span>
          <span className="text-secondary fw-bold ms-3">Followers</span>{" "}<span className="fw-bold">{user.followers}</span>
        </div>
      </div>
      <br />
      <NavigationBar />

      <UserPost pidList={userId} />
    </>
  );
};

export default UserProfile;

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchCurrentUserProfile } from "../services/auth/cur-user-service";
import { useEffect, useState } from "react";
import { isLoggedInService } from "../services/auth/is-logged-in";
import { logoutThunk } from "../services/auth/auth-thunk";
import { useDispatch } from "react-redux";

const HeadBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentUserProfile, setCurrentUserProfile] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);

  const handleLogout = async () => {
    try {
      // await axios.post('http://localhost:4000/api/users/logout', {}, { withCredentials: true });
      await dispatch(logoutThunk());
      // Navigate to the home page after successful logout
      navigate("/home");
      setLoggedOut(!loggedOut);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  // s%3AwsTkCd8LRDz_D7XvGb1YDPt8I3RKoevq.3cz0TK4UM%2Bb%2BCiVAo2pTZFBdWaWQqsPXDc2DDJkDFFI
  // s%3AwsTkCd8LRDz_D7XvGb1YDPt8I3RKoevq.3cz0TK4UM%2Bb%2BCiVAo2pTZFBdWaWQqsPXDc2DDJkDFFI
  useEffect(() => {
    const fetchData = async () => {
      const currentUserProfile = await fetchCurrentUserProfile();
      console.log("currentUserProfile", currentUserProfile);
      setCurrentUserProfile(currentUserProfile);
      const tmpLoggedIn = await isLoggedInService();
      setIsLoggedIn(tmpLoggedIn);
    };

    console.log("isLoggedIn", isLoggedIn);
    fetchData();
  }, [loggedOut]);

  return (
    <div className="row ">
      <div className="col-6 p-3">
        <button className="btn rounded-pill ps-3 pe-3 fw-bold">
          <Link to="/home">
            <img src="/images/logo.png" alt="logo" height="50" />
          </Link>
        </button>
      </div>
      <div className="col-6 p-3">
        <div className="btn-group float-end">
          {!isLoggedIn && (
            <Link to="/login" className="btn btn-light me-2">
              Login / Sign Up
            </Link>
          )}
          {isLoggedIn && (
            <>
              <Link to="/createpost" className="btn btn-primary me-2 fw-bold">
                New Post
              </Link>
              <Link
                to={`/user/${currentUserProfile?._id}`}
                className="btn btn-light me-2"
              >
                Profile
              </Link>
              <Link to="/history" className="btn btn-light me-2">
                History
              </Link>
              <div className="btn btn-light me-2" onClick={handleLogout}>
                Log Out
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeadBar;

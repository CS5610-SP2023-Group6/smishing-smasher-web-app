import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {fetchCurrentUserProfile} from "../services/auth/cur-user-service";
import {useEffect, useState} from "react";
import {isLoggedInService} from "../services/auth/is-logged-in";

const HeadBar = () => {
    const navigate = useNavigate();
    const [currentUserProfile, setCurrentUserProfile] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:4000/api/users/logout', {}, { withCredentials: true });
            // Navigate to the home page after successful logout
            navigate('/home');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };
    // s%3AwsTkCd8LRDz_D7XvGb1YDPt8I3RKoevq.3cz0TK4UM%2Bb%2BCiVAo2pTZFBdWaWQqsPXDc2DDJkDFFI
    // s%3AwsTkCd8LRDz_D7XvGb1YDPt8I3RKoevq.3cz0TK4UM%2Bb%2BCiVAo2pTZFBdWaWQqsPXDc2DDJkDFFI
    useEffect(() => {
        const fetchData = async () => {
            const currentUserProfile = await fetchCurrentUserProfile();
            console.log("currentUserProfile", currentUserProfile)
            setCurrentUserProfile(currentUserProfile);

        };
        setIsLoggedIn(isLoggedInService());
        console.log("isLoggedIn", isLoggedIn)
        fetchData();
    }, []);

    return (
        <div className="container">
            <div className="row ">
                <div className="col-6">
                    <button className="btn rounded-pill ps-3 pe-3 fw-bold">
                        <Link to="/home">
                            <img src="/images/logo.png" alt="logo" height="50" />
                        </Link>
                    </button>
                </div>
                <div className="col float-end">
                    <div className="btn-group">
                        {!isLoggedIn && (
                            <Link to="/login" className="btn btn-light me-2">
                                Login / Sign Up
                            </Link>
                        )}
                        {isLoggedIn && (
                            <>
                                <Link to={`/user/${currentUserProfile?._id}`} className="btn btn-light me-2">
                                    Profile
                                </Link>
                                <Link to="/history" className="btn btn-light me-2">
                                    History
                                </Link>
                                <Link to="/following" className="btn btn-light me-2">
                                    Following
                                </Link>
                                <div className="btn btn-light me-2" onClick={handleLogout}>
                                    Log Out
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeadBar;

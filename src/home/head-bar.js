
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {fetchCurrentUserProfile} from "../services/auth/cur-user-service";
import {useEffect, useState} from "react";
const HeadBar = ({ loggedIn }) => {
    const navigate = useNavigate();
    const [currentUserProfile, setCurrentUserProfile] = useState(null);
    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:4000/api/users/logout',{},{withCredentials:true});
            // Navigate to the home page after successful logout
            navigate('/home');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            // const userProfile = await fetchUserProfile(userId);
            const currentUserProfile = await fetchCurrentUserProfile();
            setCurrentUserProfile(currentUserProfile);

        };

        fetchData();
    }, []);
console.log("current user profile", currentUserProfile)
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
                        {!loggedIn && (
                            <Link to="/login" className="btn btn-light me-2">
                                Login / Sign Up
                            </Link>
                        )}
                        {loggedIn && (
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
                                <Link to="/logout" className="btn btn-light me-2" onClick={handleLogout}>
                                    Log Out
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeadBar;

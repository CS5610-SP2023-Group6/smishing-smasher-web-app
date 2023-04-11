import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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

    return (
        console.log("user", user),
        <div>

            <h1>User Profile</h1>
            <p>Name: {user.firstName}</p>
            {/* Add other user properties as needed */}
        </div>
    );
};

export default UserProfile;


// import React, {useEffect, useState} from "react";
// import {useDispatch, useSelector} from "react-redux";
// import {Link, useParams} from "react-router-dom";
//
// import {findUserThunk} from "../services/user-thunks";
//
//
// const Profile = () => {
//
//     const profile = useSelector(state => state.profile);
//     const userId = useParams();
//     console.log("profile, userId",userId.id);
//     const { user, loading, error } = useSelector(state => state.user);
//     const dispatch = useDispatch();
//     // const { user, loading, error } = useSelector(state => state.userData);
//     // const dispatch = useDispatch();
//
//
//
//
//     useEffect(() => {
//
//             dispatch(findUserThunk(userId.id));
//             console.log("profile",user)
//             // Get user location when the component mounts
//
//         }, [dispatch]);
//
//
//
//
//
//     if (loading) {
//         return <div>Loading...</div>;
//     }
//
//     if (error) {
//         return <div>Error: {error}</div>;
//     }
//
//     return (
//
//         <div>
//             {user}
//         </div>
//     );
// };
//
// export default Profile;
// //     return (
// //         <>
// //             <div className="position-relative">
// //                 <div className="row">
// //                     <i className="col col-1 bi bi-arrow-left fs-4"></i>
// //
// //                     <div className="col "><span className="fs-4 fw-bold">{profile.firstName} {profile.lastName}</span>
// //                         <div className="text-secondary">6,114 Tuits</div>
// //                     </div>
// //                 </div>
// //                 <img src={profile.bannerPicture} width="100%" height="200px"/>
// //                 <div className="row">
// //                     <div className="col col-7">
// //                         <img className="position-absolute rounded-circle bottom-0 start-0 ms-3"
// //                              height="100px" src={profile.profilePicture}/>
// //                     </div>
// //                     <div className="col">
// //
// //                         <Link to="/tuiter/edit-profile" >
// //                             <button className="btn border border-dark fw-bold rounded-pill float-end mt-3">
// //                                 Edit Profile
// //                             </button>
// //                         </Link>
// //                     </div>
// //                 </div>
// //             </div>
// //             <div>
// //                 <div className="fs-4 fw-bold">{profile.firstName} {profile.lastName}</div>
// //                 <div className="text-secondary">{profile.handle}</div>
// //
// //                 <div className="mt-3">{profile.bio}</div>
// //                 <div className="text-secondary mt-3">
// //                     <i className="bi bi-geo-alt"></i><span className="ms-2">{profile.location}</span>
// //                     <i className="bi bi-balloon ms-2"></i><span>Born {profile.dateOfBirth}</span>
// //                     <i className="bi bi-calendar3 ms-2"></i><span className="ms-2">Joined {profile.dateJoined}</span>
// //                 </div>
// //                 <div className="mt-3">
// //                     <span class="fw-bold">{profile.followingCount}</span> <span class="text-secondary">Following</span>
// //                     <span class="fw-bold ms-3">{profile.followersCount}</span> <span
// //                     class="text-secondary">Followers</span>
// //                 </div>
// //             </div>
// //         </>
// //     );
// // }
// //
// // export default Profile;
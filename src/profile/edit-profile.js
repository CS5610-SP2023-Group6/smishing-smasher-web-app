import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditProfile = () => {
    const { nickname } = useParams();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [handle, setHandle] = useState("");
    const [bio, setBio] = useState("");
    const [location, setLocation] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/users/${nickname}`);
                const user = response.data;
                setFirstName(user.firstName);
                setLastName(user.lastName);
                setHandle(user.handle);
                setBio(user.bio);
                setLocation(user.location);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUser();
    }, [nickname]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post("http://localhost:4000/api/users/update", {
                nickname,
                firstName,
                lastName,
                handle,
                bio,
                location,
            });

            navigate(`/user/${nickname}`);
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    return (
        <div>
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input
                    id="firstName"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                />

                <label htmlFor="lastName">Last Name</label>
                <input
                    id="lastName"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                />

                <label htmlFor="handle">Handle</label>
                <input
                    id="handle"
                    value={handle}
                    onChange={(event) => setHandle(event.target.value)}
                />

                <label htmlFor="bio">Bio</label>
                <textarea
                    id="bio"
                    value={bio}
                    onChange={(event) => setBio(event.target.value)}
                />

                <label htmlFor="location">Location</label>
                <input
                    id="location"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                />

                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditProfile;

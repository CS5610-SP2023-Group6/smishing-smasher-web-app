import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditProfile = () => {

    const navigate = useNavigate();

    const [nickname, setNickname] = useState("");
    // const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [website, setWebsite] = useState("");
    const [bio, setBio] = useState("");
    const [uid, setUid] = useState("");


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/users/profile', {withCredentials: true});
                const user = response.data;
                setNickname(user.nickname);
                setEmail(user.email);
                setAddress1(user.address1);
                setAddress2(user.address2);
                setCity(user.city);
                setState(user.state);
                setZip(user.zip);
                setWebsite(user.website);
                setBio(user.bio);
                setUid(user._id);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUser();
    }, [uid]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log({
            nickname,
            email,
            address1,
            address2,
            city,
            state,
            zip,
            website,
            bio,
        }, "uid", uid)

        try {
            await axios.post("http://localhost:4000/api/users/edit", {
                nickname,
                email,
                address1,
                address2,
                city,
                state,
                zip,
                website,
                bio,
            },{ withCredentials: true });

            navigate(`/user/${uid}`);
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    return (
        <div>
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="col-md-6">
                    <label htmlFor="nickname" className="form-label">nickname</label>
                    <input
                        id="nickname"
                        value={nickname}
                        onChange={(event) => setNickname(event.target.value)}
                        className="form-control"
                    />
                </div>
                {/*<div className="col-md-6">*/}
                {/*    <label htmlFor="lastName" className="form-label">Last Name</label>*/}
                {/*    <input*/}
                {/*        id="lastName"*/}
                {/*        value={lastName}*/}
                {/*        onChange={(event) => setLastName(event.target.value)}*/}
                {/*        className="form-control"*/}
                {/*    />*/}
                {/*</div>*/}
                <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="website" className="form-label">Website</label>
                    <input
                        id="website"
                        value={website}
                        onChange={(event) => setWebsite(event.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="address1" className="form-label">Address 1</label>
                    <input
                        id="address1"
                        value={address1}
                        onChange={(event) => setAddress1(event.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="address2" className="form-label">Address 2</label>
                    <input
                        id="address2"
                        value={address2}
                        onChange={(event) => setAddress2(event.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="col-md-4">
                    <label htmlFor="city" className="form-label">City</label>
                    <input
                        id="city"
                        value={city}
                        onChange={(event) => setCity(event.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="col-md-4">
                    <label htmlFor="state" className="form-label">State</label>
                    <input
                        id="state"
                        value={state}
                        onChange={(event) => setState(event.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="col-md-4">
                    <label htmlFor="zip" className="form-label">Zip Code</label>
                    <input
                        id="zip"
                        value={zip}
                        onChange={(event) => setZip(event.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="col-12">
                    <label htmlFor="bio" className="form-label">Bio</label>
                    <textarea
                        id="bio"
                        value={bio}
                        onChange={(event) => setBio(event.target.value)}
                        className="form-control"
                        rows="3"
                    />
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;


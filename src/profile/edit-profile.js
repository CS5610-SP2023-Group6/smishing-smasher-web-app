import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
const API_BASE = process.env.REACT_APP_API_BASE;
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
        const response = await axios.get(
          `${API_BASE}/users/profile`,
          { withCredentials: true }
        );
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
    console.log(
      {
        nickname,
        email,
        address1,
        address2,
        city,
        state,
        zip,
        website,
        bio,
      },
      "uid",
      uid
    );

    try {
      await axios.post(
        `${API_BASE}/users/edit`,
        {
          nickname,
          email,
          address1,
          address2,
          city,
          state,
          zip,
          website,
          bio,
        },
        { withCredentials: true }
      );

      navigate(`/user/${uid}`);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div>
      <h2 className="my-5">Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="col-md-6 fw-bold mb-3">
          <label htmlFor="nickname" className="form-label">
            Nickname
          </label>
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
        <div className="col-md-6 fw-bold mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md-6 fw-bold mb-3">
          <label htmlFor="website" className="form-label">
            Website
          </label>
          <input
            id="website"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md-6 fw-bold mb-3">
          <label htmlFor="address1" className="form-label">
            Address 1
          </label>
          <input
            id="address1"
            value={address1}
            onChange={(event) => setAddress1(event.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md-6 fw-bold mb-3">
          <label htmlFor="address2" className="form-label">
            Address 2
          </label>
          <input
            id="address2"
            value={address2}
            onChange={(event) => setAddress2(event.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="city" className="form-label fw-bold">
            City
          </label>
          <input
            id="city"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="state" className="form-label fw-bold">
            State
          </label>
          <select
            className="form-control wd-input-text"
            name="state"
            id="state"
            value={state}
            onChange={(event) => setState(event.target.value)}
          >
            <option value="">--Select a state--</option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="zip" className="form-label fw-bold">
            Zip Code
          </label>
          <input
            id="zip"
            value={zip}
            onChange={(event) => setZip(event.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-12 mb-3">
          <label htmlFor="bio" className="form-label fw-bold">
            Bio
          </label>
          <textarea
            id="bio"
            value={bio}
            onChange={(event) => setBio(event.target.value)}
            className="form-control"
            rows="3"
          />
        </div>
        <div className="col-12 mb-3">
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;

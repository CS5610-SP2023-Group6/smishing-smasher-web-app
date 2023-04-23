import React, { useState } from "react";
import axios from "axios";
import { fetchCurrentUserProfile } from "../services/cur-user-service";
import { createPost } from "../services/posts/posts-service";
import { useNavigate } from "react-router";
import History from "../profile-filter";
import HeadBar from "../home/head-bar";
import "./index.css";
// import { createPost, fetchCurrentUserProfile } from '../services'; // Import your functions

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [spamText, setSpamText] = useState("");
  const [zip, setZip] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userProfile = await fetchCurrentUserProfile();
    if (!userProfile) {
      console.error("Error fetching user profile");
      return;
    }

    const post = {
      authorID: userProfile._id,
      title,
      phone,
      city,
      state,
      zip,
      spamText,
      description,
      createdAt: new Date().toISOString(),
    };

    const createdPost = await createPost(post);
    if (!createdPost) {
      console.error("Error creating post");
      return;
    }
    navigator("/home");

    // Add the new post ID to the user's posts array
    // userProfile.posts.push(createdPost._id);
    // Do something with the updated user profile (e.g., update the backend, display a success message, etc.)
  };

  return (
    <>
      <HeadBar />
      <form
        onSubmit={handleSubmit}
        className="container"
        style={{
          border: "1px solid #ccc",
          marginTop: "40px",
          padding: "20px",
          borderRadius: "5px",
        }}
      >
        <h2 className="wd-title fw-bolder m-3 pb-3">Create A New Post</h2>
        <div className="mb-3">
          <label htmlFor="title" className="form-label fw-bold">
            Title<span className="fw-regular fs-6">*</span>
          </label>
          <input
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            style={{ border: "none", backgroundColor: "#f5f5f5" }}
            placeholder="Enter title"
            className="form-control wd-input-text"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label fw-bold">
            Phone<span className="fw-regular fs-6">*</span>
          </label>
          <input
            id="phone"
            value={phone}
            type="number"
            onChange={(event) => setPhone(event.target.value)}
            style={{ border: "none", backgroundColor: "#f5f5f5" }}
            placeholder="Enter phone"
            className="wd-input-text form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="city" className="form-label fw-bold">
            City<span className="fw-regular fs-6">*</span>
          </label>
          <input
            id="city"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            style={{ border: "none", backgroundColor: "#f5f5f5" }}
            placeholder="Enter city"
            className="form-control wd-input-text"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="state" className="form-label fw-bold">
            State<span className="fw-regular fs-6">*</span>
          </label>
          <select
            className="form-control wd-input-text"
            name="state"
            id="state"
            value={state}
            style={{ border: "none", backgroundColor: "#f5f5f5" }}
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

        <div className="mb-3">
          <label htmlFor="zip" className="form-label fw-bold">
            Zip<span className="fw-regular fs-6">*</span>
          </label>
          <input
            id="zip"
            value={zip}
            onChange={(event) => setZip(event.target.value)}
            style={{ border: "none", backgroundColor: "#f5f5f5" }}
            placeholder="Enter zip"
            className="form-control wd-input-text"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="spam" className="form-label fw-bold">
            Spam Text
          </label>
          <textarea
            id="spam"
            value={spamText}
            rows={5}
            onChange={(event) => setSpamText(event.target.value)}
            style={{ border: "none", backgroundColor: "#f5f5f5" }}
            placeholder="Enter spam text"
            className="form-control wd-input-text"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label fw-bold">
            Description<span className="fw-regular fs-6">*</span>
          </label>
          <textarea
            id="description"
            value={description}
            rows={5}
            onChange={(event) => setDescription(event.target.value)}
            style={{ border: "none", backgroundColor: "#f5f5f5" }}
            placeholder="Enter description"
            className="wd-input-text form-control"
          />
        </div>

        <div className="wd-create-btn pt-3">
          <button type="submit" className="btn btn-primary fw-bold">
            Create Post
          </button>
        </div>
      </form>
    </>
  );
};

export default CreatePost;

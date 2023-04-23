import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import HeadBar from "../home/head-bar";
import "./index.css";
// import { createPost, fetchCurrentUserProfile } from '../services'; // Import your functions

const EditRole = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const api = axios.create({ withCredentials: true });
    const res = await api.get(`http://localhost:4000/api/users/email/${email}`);
    const user = res.data;
    console.log(user);
    if (!user) {
      console.error("Error fetching user profile");
      return;
    }

    const newRole = {
      _id: user._id,
      role: role,
    };
    const res2 = await api.post(`http://localhost:4000/api/users/update`, newRole);
    console.log(res2.data);

    navigate("/home");

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
        <h2 className="wd-title fw-bolder m-3 pb-3">Change A User's Role</h2>
        <div className="mb-3">
          <label htmlFor="title" className="form-label fw-bold">
            Email<span className="fw-regular fs-6">*</span>
          </label>
          <input
            id="title"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            style={{ border: "none", backgroundColor: "#f5f5f5" }}
            placeholder="Enter email"
            className="form-control wd-input-text"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="role" className="form-label fw-bold">
            User Role<span className="fw-regular fs-6">*</span>
          </label>
          <select
            className="form-control wd-input-text"
            name="role"
            id="role"
            value={role}
            style={{ border: "none", backgroundColor: "#f5f5f5" }}
            onChange={(event) => setRole(event.target.value)}
          >
            <option value="">--Select a state--</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        <div className="wd-create-btn pt-3">
          <button type="submit" className="btn btn-primary fw-bold">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default EditRole;

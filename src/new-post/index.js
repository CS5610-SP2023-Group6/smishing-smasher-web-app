import React, { useState } from 'react';
import axios from 'axios';
import {fetchCurrentUserProfile} from "../services/cur-user-service";
import {createPost} from "../services/posts/posts-service";
import History from "../history";
import HeadBar from "../home/head-bar";
// import { createPost, fetchCurrentUserProfile } from '../services'; // Import your functions

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userProfile = await fetchCurrentUserProfile();
        if (!userProfile) {
            console.error('Error fetching user profile');
            return;
        }

        const post = {
            authorID: userProfile._id,
            title,
            phone,
            city,
            state,
            zip,
            description,
            createdAt: new Date().toISOString(),
        };

        const createdPost = await createPost(post);
        if (!createdPost) {
            console.error('Error creating post');
            return;
        }

        // Add the new post ID to the user's posts array
        // userProfile.posts.push(createdPost._id);
        // Do something with the updated user profile (e.g., update the backend, display a success message, etc.)
    };

    return (
        <>
        <HeadBar/>
        <form onSubmit={handleSubmit} className="container">
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input id="title" value={title} onChange={(event) => setTitle(event.target.value)} className="form-control" />
            </div>

            <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input id="phone" value={phone} onChange={(event) => setPhone(event.target.value)} className="form-control" />
            </div>

            <div className="mb-3">
                <label htmlFor="city" className="form-label">City</label>
                <input id="city" value={city} onChange={(event) => setCity(event.target.value)} className="form-control" />
            </div>

            <div className="mb-3">
                <label htmlFor="state" className="form-label">State</label>
                <input id="state" value={state} onChange={(event) => setState(event.target.value)} className="form-control" />
            </div>

            <div className="mb-3">
                <label htmlFor="zip" className="form-label">Zip</label>
                <input id="zip" value={zip} onChange={(event) => setZip(event.target.value)} className="form-control" />
            </div>

            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea id="description" value={description} onChange={(event) => setDescription(event.target.value)} className="form-control" />
            </div>

            <button type="submit" className="btn btn-primary">Create Post</button>
        </form>
        </>
    );
};

export default CreatePost;
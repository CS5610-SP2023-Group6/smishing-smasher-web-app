import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const POST_API = "http://localhost:4000/api/posts";

// Define a Redux slice for posts
const postsSlice = createSlice({
    name: "posts",
    initialState: { posts: [], loading: false, error: null },
    reducers: {
        fetchPostsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchPostsSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.posts = action.payload;
        },
        fetchPostsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchPostsStart, fetchPostsSuccess, fetchPostsFailure } =
    postsSlice.actions;

export default postsSlice.reducer;

// Thunk for fetching posts
export const findPostsThunk = () => async (dispatch) => {
    try {
        dispatch(fetchPostsStart()); // Dispatch fetchPostsStart action to update loading state
        const response = await axios.get(POST_API); // Make API call to fetch posts
        const posts = response.data; // Extract posts from response
        dispatch(fetchPostsSuccess(posts)); // Dispatch fetchPostsSuccess action with fetched posts
    } catch (error) {
        dispatch(fetchPostsFailure(error.message)); // Dispatch fetchPostsFailure action with error message
    }
};

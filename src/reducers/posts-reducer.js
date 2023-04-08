import {createSlice} from "@reduxjs/toolkit";
import {findPosts} from "../services/posts-service.js";

const initialState = {
    posts: [],
    loading: false,
    error: null
};

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        fetchPostsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchPostsSuccess: (state, {payload}) => {
            state.posts = payload;
            state.loading = false;
            console.log("state.posts",state.posts)
            state.error = null;
        },
        fetchPostsFailure: (state, {payload}) => {
            state.loading = false;
            state.error = payload;
        }
    }
});

export const {
    fetchPostsStart,
    fetchPostsSuccess,
    fetchPostsFailure
} = postSlice.actions;

export const fetchPostsThunk = () => async (dispatch) => {
    try {
        // Dispatch the fetchPostsStart action to update the state
        dispatch(fetchPostsStart());
        // Fetch the posts data from a service or API
        const posts = await findPosts();
        console.log(posts)
        // Dispatch the fetchPostsSuccess action with the fetched data
        dispatch(fetchPostsSuccess(posts));
    } catch (error) {
        // Dispatch the fetchPostsFailure action with the error message
        dispatch(fetchPostsFailure(error.message));
    }
};

export default postSlice.reducer;

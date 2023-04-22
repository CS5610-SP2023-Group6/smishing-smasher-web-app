import { createSlice } from "@reduxjs/toolkit";
import {
  loginThunk,
  logoutThunk,
  // registerThunk,
  // profileThunk,
  // updateUserThunk,
} from "../services/auth/auth-thunk";

const authSlice = createSlice({
  name: "auth",
  initialState: { currentUser: null, isLoggedIn: false },
  reducers: {},
  extraReducers: {
    [loginThunk.fulfilled]: (state, { payload }) => {
      state.currentUser = payload;
      state.isLoggedIn = true;
    },
    [logoutThunk.fulfilled]: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
    },
  },
});

export default authSlice.reducer;

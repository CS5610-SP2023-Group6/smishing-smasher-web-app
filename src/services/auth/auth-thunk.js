import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "./auth-service";

export const loginThunk = createAsyncThunk(
  "users/login",
  async (credentials) => {
    const user = await authService.login(credentials);
    return user;
  }
);

export const aloginThunk = createAsyncThunk(
  "users/alogin",
  async (credentials) => {
    const user = await authService.alogin(credentials);
    return user;
  }
);

export const registerThunk = createAsyncThunk(
  "users/register",
  async (credentials) => {
    const user = await authService.register(credentials);
    return user;
  }
);

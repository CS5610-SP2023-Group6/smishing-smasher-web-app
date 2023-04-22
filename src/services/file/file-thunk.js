import { createAsyncThunk } from "@reduxjs/toolkit";
import * as fileService from "./file-service";

export const uploadThunk = createAsyncThunk(
  "files/upload",
  async (credentials) => {
    const uploadedFiles = await fileService.upload(credentials);
    return uploadedFiles;
  }
);
import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {text: ''},
  reducers: {
    editSearch(state, action) {
      state.text = action.payload.text;
    },
  },
});

export const { editSearch } = searchSlice.actions;
export default searchSlice.reducer;
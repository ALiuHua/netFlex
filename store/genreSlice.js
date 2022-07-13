import { createSlice } from "@reduxjs/toolkit";
const genreSlice = createSlice({
  name: "genre",
  initialState: { genres: null },
  reducers: {
    setGenre(state, action) {
      state.genres = action.payload;
    },
  },
});
export const genreActions = genreSlice.actions;
export default genreSlice;

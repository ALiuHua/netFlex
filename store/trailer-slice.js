import { createSlice } from "@reduxjs/toolkit";
const trailerSlice = createSlice({
  name: "trailer",
  initialState: {
    trailer: null,
  },
  reducers: {
    setTrailer(state, action) {
      state.trailer = action.payload;
    },
  },
});
export const trailerActions = trailerSlice.actions;
export default trailerSlice;

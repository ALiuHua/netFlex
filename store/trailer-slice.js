import { createSlice } from "@reduxjs/toolkit";
const trailerSlice = createSlice({
  name: "trailer",
  initialState: {
    trailer: null,
    // showPlayer: {
    //   isShown: false,
    //   playerID: null,
    //   row: null,
    // },
    // timer,
    // vPlayer,
  },
  reducers: {
    setTrailer(state, action) {
      state.trailer = action.payload;
    },
    // setShowPlayer(state, action) {
    //   state.showPlayer = action.payload;
    // },
  },
});
export const trailerActions = trailerSlice.actions;
export default trailerSlice;

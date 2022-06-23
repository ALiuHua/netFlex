import { createSlice } from "@reduxjs/toolkit";
const playerSlice = createSlice({
  name: "player",
  initialState: {
    mute: true,
    activePlayer: "billboard",
  },
  reducers: {
    toggleMuted(state) {
      state.mute = !state.mute;
    },
    toggleActivePlayer(state, action) {
      state.activePlayer = action.payload;
    },
  },
});
export const playerActions = playerSlice.actions;
export default playerSlice;

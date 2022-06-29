import { createSlice } from "@reduxjs/toolkit";
const playerSlice = createSlice({
  name: "player",
  initialState: {
    mute: true,
    activePlayer: "billboard",
    playedTime: 0,
  },
  reducers: {
    toggleMuted(state) {
      state.mute = !state.mute;
    },
    toggleActivePlayer(state, action) {
      state.activePlayer = action.payload;
    },
    setPlayedTime(state,action) {
      state.playedTime = action.payload;
    },
  },
});
export const playerActions = playerSlice.actions;
export default playerSlice;

import { configureStore } from "@reduxjs/toolkit";
import playerSlice from "./player-slice";
import trailerSlice from "./trailer-slice";
const store = configureStore({
  reducer: {
    player: playerSlice.reducer,
    trailer: trailerSlice.reducer,
  },
});

export default store;

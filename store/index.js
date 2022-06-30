import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./category-slice";
import playerSlice from "./player-slice";
import trailerSlice from "./trailer-slice";

const store = configureStore({
  reducer: {
    player: playerSlice.reducer,
    trailer: trailerSlice.reducer,
    category: categorySlice,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./category-slice";
import playerSlice from "./player-slice";
import trailerSlice from "./trailer-slice";
import detailsSlice from "./detailsSlice";
const store = configureStore({
  reducer: {
    player: playerSlice.reducer,
    trailer: trailerSlice.reducer,
    category: categorySlice,
    details: detailsSlice.reducer,
  },
});

export default store;

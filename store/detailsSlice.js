import { createSlice } from "@reduxjs/toolkit";
const detailsSlice = createSlice({
  name: "details",
  initialState: {
    posterPath: null,
  },
  reducers: {
    setItemDetails(state, action) {
      state.posterPath = action.payload.posterPath;
    },
  },
});

export const detailsActions = detailsSlice.actions;
export default detailsSlice;

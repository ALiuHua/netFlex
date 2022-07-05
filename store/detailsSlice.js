import { createSlice } from "@reduxjs/toolkit";
const detailsSlice = createSlice({
  name: "details",
  initialState: {
    posterPath: null,
    // itemCategory: null,
  },
  reducers: {
    setItemDetails(state, action) {
      state.posterPath = action.payload.posterPath;
      //   state.itemCategory = action.payload.itemCategory;
    },
  },
});

export const detailsActions = detailsSlice.actions;
export default detailsSlice;

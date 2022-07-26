import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "users",
  initialState: {
    email: null,
    profiles: [],
    selectedProfile: null,
    isManagingProfile: false,
  },
  reducers: {
    setSelectedProfile(state, action) {
      state.selectedProfile = action.payload;
    },
    // setProfiles,
  },
});
export const userActions = userSlice.actions;
export default userSlice;

import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "users",
  initialState: {
    email: null,
    profiles: [],
    selectedProfile: null,
    showManagingProfile: false,
  },
  reducers: {
    setSelectedProfile(state, action) {
      state.selectedProfile = action.payload;
    },
    setProfiles(state, action) {
      const { type, payload } = action.payload;
      switch (type) {
        case "ADD_PROFILE": {
          state.profiles.push(payload);
          return;
        }
        case "DELETE_PROFILE": {
          state.profiles = state.profiles.filter(
            (profile) => profile.avatarId !== payload
          );
          return;
        }
        case "EDIT_PROFILE": {
          state.profiles = state.profiles.map((profile) =>
            profile.avatarId === payload.originalProfile.avatarId
              ? payload.editedProfile
              : profile
          );
          return;
        }
        case "SET_PROFILE": {
          state.profiles = payload;
          return;
        }
      }
    },
    setShowManagingProfile(state, action) {
      state.showManagingProfile = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
  },
});
export const userActions = userSlice.actions;
export default userSlice;

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
      console.log("this action running", action);
      const { type, payload } = action.payload;
      switch (type) {
        case "ADD_PROFILE": {
          console.log("ADD_PROFILE");
          console.log(state);
          state.profiles.push(payload);
          return;
        }
        case "DELETE_PROFILE": {
          //find the
          console.log("DELETE_PROFILE");
          console.log(payload);
          state.profiles = state.profiles.filter(
            (profile) => profile.avatarId !== payload
          );
          return;
        }
        case "EDIT_PROFILE": {
          console.log("EDIT_PROFILE");
          state.profiles = state.profiles.map((profile) =>
            profile.avatarId === payload.originalProfile.avatarId
              ? payload.editedProfile
              : profile
          );
          return;
        }
        case "SET_PROFILE": {
          console.log("SET_PROFILE", payload);
          state.profiles = payload;
          return;
        }
      }
    },
    setShowManagingProfile(state, action) {
      console.log("setshow managing ", action, action.payload);
      state.showManagingProfile = action.payload;
    },
  },
});
export const userActions = userSlice.actions;
export default userSlice;

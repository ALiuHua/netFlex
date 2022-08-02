import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";
import { useSelector } from "react-redux";
const useInitProfiles = (userEmail, userProfiles) => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("index of browsen useeffect running", userProfiles);
    dispatch(
      userActions.setProfiles({
        type: "SET_PROFILE",
        payload: userProfiles || [],
      })
    );
    console.log(userEmail);
    dispatch(userActions.setEmail(userEmail)); // we may not need this
  }, [userProfiles, userEmail]);
  useEffect(() => {
    const localNetflexInfo = JSON.parse(localStorage.getItem("netflex"));
    if (localNetflexInfo && userProfiles?.length !== 0) {
      dispatch(userActions.setSelectedProfile(localNetflexInfo));
    }
    if (!localNetflexInfo && userProfiles) {
      dispatch(userActions.setSelectedProfile(userProfiles[0]));
    }
  }, []);
  const showManagingProfile = useSelector(
    (state) => state.users.showManagingProfile
  );
  const hasProfileSelected = useSelector(
    (state) => state.users.selectedProfile
  );
  const showProfilesManagingPage = userProfiles
    ? showManagingProfile
    : !!hasProfileSelected === showManagingProfile;
  // const showProfilesManagingPage = !userProfiles || showManagingProfile;

  return { showProfilesManagingPage };
};

export default useInitProfiles;

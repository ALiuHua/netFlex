import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import BrowseContent from "../../components/billboard/BrowseContent";
import { getGenres } from "../../helpers/browseHelper";
import { genreActions } from "../../store/genreSlice";
import { getSession } from "next-auth/react";
import { userActions } from "../../store/userSlice";
import { useSelector } from "react-redux";
import useInitProfiles from "../../components/hooks/useInitProfiles";

const Browse = ({ userEmail, userProfiles }) => {
  const { showProfilesManagingPage } = useInitProfiles(userEmail, userProfiles);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   console.log("index of browsen useeffect running", userProfiles);
  //   dispatch(
  //     userActions.setProfiles({
  //       type: "SET_PROFILE",
  //       payload: userProfiles || [],
  //     })
  //   );
  //   console.log(userEmail);
  //   dispatch(userActions.setEmail(userEmail)); // we may not need this
  // }, [userProfiles, userEmail]);
  // useEffect(() => {
  //   const localNetflexInfo = JSON.parse(localStorage.getItem("netflex"));
  //   if (localNetflexInfo) {
  //     dispatch(userActions.setSelectedProfile(localNetflexInfo));
  //   }
  //   if (!localNetflexInfo && userProfiles) {
  //     dispatch(userActions.setSelectedProfile(userProfiles[0]));
  //   }
  // }, []);

  // const showManagingProfile = useSelector(
  //   (state) => state.users.showManagingProfile
  // );
  // const hasProfileSelected = useSelector(
  //   (state) => state.users.selectedProfile
  // );
  // console.log(
  //   showManagingProfile === !!userProfiles || hasProfileSelected,
  //   showManagingProfile,
  //   !!userProfiles,
  //   hasProfileSelected
  // );

  return (
    <BrowseContent
      category="browse"
      profilesManaging={showProfilesManagingPage}
      userEmail={userEmail}
    />
  );
};
export default Browse;
export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  // const user = session.user;
  // console.log("data", data);
  const { email: userEmail, profiles: userProfiles } = session.user;
  // // console.log(userEmail, userProfiles, !userProfiles);
  // // check if it's a new user?
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      // data,
      userEmail,
      userProfiles: userProfiles || null,
    },
  };
};

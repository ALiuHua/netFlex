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

  console.log("borwse index running");
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
  const { email: userEmail, profiles: userProfiles } = session.user;
  return {
    props: {
      // data,
      userEmail,
      userProfiles: userProfiles || null,
    },
  };
};

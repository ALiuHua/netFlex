import React from "react";
import BrowseContent from "../../components/billboard/BrowseContent";
import useInitProfiles from "../../components/hooks/useInitProfiles";
import { getSession } from "next-auth/react";

const Movie = ({ userEmail, userProfiles }) => {
  const { showProfilesManagingPage } = useInitProfiles(userEmail, userProfiles);
  return (
    <BrowseContent
      category="movies"
      profilesManaging={showProfilesManagingPage}
      userEmail={userEmail}
    />
  );
};

export default Movie;
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

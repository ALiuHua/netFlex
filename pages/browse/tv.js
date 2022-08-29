import React from "react";
import BrowseContent from "../../components/billboard/BrowseContent";
import useInitProfiles from "../../components/hooks/useInitProfiles";
import { getSession } from "next-auth/react";
const Tv = ({ userEmail, userProfiles }) => {
  const { showProfilesManagingPage } = useInitProfiles(userEmail, userProfiles);
  return (
    <BrowseContent
      category="TVShows"
      profilesManaging={showProfilesManagingPage}
      userEmail={userEmail}
    />
  );
};

export default Tv;
export const getServerSideProps = async (context) => {
  const session = await getSession(context);
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
      userEmail,
      userProfiles: userProfiles || null,
    },
  };
};

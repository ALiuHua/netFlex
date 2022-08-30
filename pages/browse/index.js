import React from "react";
import Head from "next/head";
import BrowseContent from "../../components/billboard/BrowseContent";
import { getSession } from "next-auth/react";
import useInitProfiles from "../../components/hooks/useInitProfiles";

const Browse = ({ userEmail, userProfiles }) => {
  const { showProfilesManagingPage } = useInitProfiles(userEmail, userProfiles);
  return (
    <>
      <Head>
        <title>Netflex - Media straming...</title>
      </Head>
      <BrowseContent
        category="browse"
        profilesManaging={showProfilesManagingPage}
        userEmail={userEmail}
      />
    </>
  );
};
export default Browse;
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

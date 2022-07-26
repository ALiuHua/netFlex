import React, { useEffect, useSyncExternalStore } from "react";
import { useDispatch } from "react-redux";
import BrowseContent from "../../components/billboard/BrowseContent";
import { getGenres } from "../../helpers/browseHelper";
import { genreActions } from "../../store/genreSlice";
import { getSession } from "next-auth/react";
import { useSelector } from "react-redux";
const Browse = ({ movieGenres, tvGenres }) => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(genreActions.setGenre({ movies: movieGenres, TVShows: tvGenres }));
  // }, [movieGenres, tvGenres]);

  // isManagingProfiles = false || userProfiles
  const isManagingProfile = useSelector(
    (state) => state.users.isManagingProfile
  );
  return (
    <BrowseContent
      category="browse"
      profilesManaging={isManagingProfile || !userProfiles}
      userEmail={userEmail}
    />
  );
};
export default Browse;
export const getServerSideProps = async (context) => {
  const { user } = await getSession(context);
  const { email: userEmail, profiles: userProfiles } = user;
  return {
    props: {
      userEmail,
      userProfiles: userProfiles || null,
    },
  };
};
// export const getStaticProps = async () => {
//   const movieGenres = await getGenres("movies");
//   const tvGenres = await getGenres("TVShows");
//   // another way is to create dummy data locally.
//   console.log("getProps running");
//   return {
//     props: {
//       movieGenres,
//       tvGenres,
//     },
//   };
// };

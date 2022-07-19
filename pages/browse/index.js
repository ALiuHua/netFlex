import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import BrowseContent from "../../components/billboard/BrowseContent";
import { getGenres } from "../../helpers/browseHelper";
import { genreActions } from "../../store/genreSlice";
const Browse = ({ movieGenres, tvGenres }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(genreActions.setGenre({ movies: movieGenres, TVShows: tvGenres }));
  }, [movieGenres, tvGenres]);
  return <BrowseContent category="browse" />;
};
export default Browse;
export const getStaticProps = async () => {
  const movieGenres = await getGenres("movies");
  const tvGenres = await getGenres("TVShows");
  // another way is to create dummy data locally.
  console.log("getProps running");
  return {
    props: {
      movieGenres,
      tvGenres,
    },
  };
};

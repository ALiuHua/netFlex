import React, {
  useState,
  useContext,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import BrowseContent from "../../components/billboard/BrowseContent";
import { getGenres } from "../../helpers/browseHelper";
import { genreActions } from "../../store/genreSlice";
// import { PlayerContext } from "../store/playerContext";
// export const GenreContext = React.createContext({
//   movies: [],
//   TVShows: [],
// });
// we will always landing on this page programactically so we will have genres here.
const Browse = ({ movieGenres, tvGenres }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(genreActions.setGenre({ movies: movieGenres, TVShows: tvGenres }));
  }, [movieGenres, tvGenres]);
  // const genreContextValue = useMemo(() => {
  //   return { movies: movieGenres, TVShows: tvGenres };
  // }, []); // when use genre context i need to memeo this because otherwise card will re-rending
  // const router = useRouter();
  // console.log(router);
  // const onShowDetailsHandler = useCallback((url) => {
  //   router.push(url, undefined, { shallow: true });
  // }, []);
  // useEffect(() => {
  //   console.log(router);
  //   if (router.asPath.includes("jbv")) setShowMoreInfo(true);
  // }, []);
  return (
    <BrowseContent category="browse" />
    // <>
    //   <BillboardHero category={category} onShowMore={onShowDetailsHandler} />
    //   <Lolomo category={category} onShowMore={onShowDetailsHandler} />
    //   {router.query.jbv && <Details category={category} />}
    // </>
  );
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

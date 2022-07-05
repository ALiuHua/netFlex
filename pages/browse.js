import React, { useState, useContext, useCallback, useMemo } from "react";
import { useRouter } from "next/router";

import BillboardHero from "../components/billboard/BillboardHero";
import Lolomo from "../components/billboard/Lolomo";
import Details from "../components/details/Details";

import { getGenres } from "../helpers/browseHelper";
// import { PlayerContext } from "../store/playerContext";
export const GenreContext = React.createContext({
  movies: [],
  TVShows: [],
});
const Browse = ({ category = "browse", movieGenres, tvGenres }) => {
  const genreContextValue = useMemo(() => {
    return { movies: movieGenres, TVShows: tvGenres };
  }, []);
  const router = useRouter();
  console.log(router);
  const onShowDetailsHandler = useCallback((url) => {
    router.push(url, undefined, { shallow: true });
  }, []);
  // useEffect(() => {
  //   console.log(router);
  //   if (router.asPath.includes("jbv")) setShowMoreInfo(true);
  // }, []);
  return (
    <GenreContext.Provider value={genreContextValue}>
      <BillboardHero category={category} onShowMore={onShowDetailsHandler} />
      <Lolomo category={category} onShowMore={onShowDetailsHandler} />
      {router.query.jbv && (
        <Details
          category={category}
          genreContext={genreContextValue}
          // detailsPoster={itemDetail}
        />
      )}

      {/* <Details category={category} genreContext={genreContextValue} /> */}
    </GenreContext.Provider>
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

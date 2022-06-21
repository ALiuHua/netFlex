import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import BillboardHero from "../components/billboard/BillboardHero";
import Lolomo from "../components/billboard/Lolomo";
import Details from "../components/details/Details";
import { getGenres } from "../helpers/browseHelper";
import { CardContext } from "../store/cardContext";
import { PlayerContext } from "../store/playerContext";
export const GenreContext = React.createContext({
  movies: [],
  TVShows: [],
});
const Browse = ({ category = "TVShows", movieGenres, tvGenres }) => {
  const genreContextValue = { movies: movieGenres, TVShows: tvGenres };
  const [detailsPoster, setDetailsPoster] = useState(null);
  const router = useRouter();
  const { setActivePlayer } = useContext(PlayerContext);
  const onShowDetailsHandler = (bannerPath, id) => {
    if (id) router.push(`/browse/?jbv=${id}`, undefined, { shallow: true });
    setActivePlayer("previewPlayer");
    setDetailsPoster(bannerPath);
  };
  // useEffect(() => {
  //   console.log(router);
  //   if (router.asPath.includes("jbv")) setShowMoreInfo(true);
  // }, []);
  return (
    <GenreContext.Provider value={genreContextValue}>
      <BillboardHero category={category} onShowMore={onShowDetailsHandler} />
      <Lolomo category={category} onShowMore={onShowDetailsHandler} />
      {router.asPath.includes("jbv") && (
        <Details
          category={category}
          genreContext={genreContextValue}
          detailsPoster={detailsPoster}
        />
      )}
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
// export const getServerSideProps = async () => {
//   const moviesData = await fetch(
//     "https://api.themoviedb.org/3/discover/tv?api_key=75d815a7423ee9ff009585239a370212&with_genres=10768&with_watch_providers=8&watch_region=AU"
//   );
//   const { results } = await moviesData.json();
//   console.log(results);
//   return { props: { results } };
// };

// const Wrapper = styled.div`
//   background-color: orangered;
//   margin-top: -70px;
// `;

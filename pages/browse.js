import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BillboardHero from "../components/billboard/BillboardHero";
import Lolomo from "../components/billboard/Lolomo";
import MoreInfo from "../components/moreInfo/MoreInfo";
import { getGenres } from "../helpers/browseHelper";
export const GenreContext = React.createContext({
  movies: [],
  TVShows: [],
});
const Browse = ({ category = "TVShows", movieGenres, tvGenres }) => {
  const genreContextValue = { movies: movieGenres, TVShows: tvGenres };
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const onShowMoreInfoHandler = () => {
    console.log("onShowMore");
    setShowMoreInfo(!showMoreInfo);
  };
  return (
    <GenreContext.Provider value={genreContextValue}>
      <BillboardHero category={category} onShowMore={onShowMoreInfoHandler} />
      <Lolomo category={category} />
      {showMoreInfo && <MoreInfo onShowMore={onShowMoreInfoHandler} />}
    </GenreContext.Provider>
  );
};

export default Browse;

export const getStaticProps = async () => {
  const movieGenres = await getGenres("movies");
  const tvGenres = await getGenres("TVShows");

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

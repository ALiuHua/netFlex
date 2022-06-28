import React, { useState, useEffect, useContext, useCallback } from "react";
import { useRouter } from "next/router";
import Lolomo from "../components/billboard/Lolomo";
import { getGenres } from "../helpers/browseHelper";
import { useDispatch } from "react-redux";
import { playerActions } from "../store/player-slice";
export const GenreContext = React.createContext({
  movies: [],
  TVShows: [],
});
import Content from "../components/billboard/Content";
const Browse = ({ category = "TVShows", movieGenres, tvGenres }) => {
  const genreContextValue = { movies: movieGenres, TVShows: tvGenres };
  const [detailsPoster, setDetailsPoster] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
  // const { setActivePlayer } = useContext(PlayerContext);
  const onShowDetailsHandler = useCallback((bannerPath, id) => {
    if (id) router.push(`/browse/?jbv=${id}`, undefined, { shallow: true });
    dispatch(playerActions.toggleActivePlayer("detailPlayer"));
  }, []);
  return (
    <Content category="TVShows" movieGenres={movieGenres} tvGenres={tvGenres}>
      <Lolomo category={category} onShowMore={onShowDetailsHandler} />
    </Content>
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

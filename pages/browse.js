import React, { useEffect } from "react";
import styled from "styled-components";
import BillboardHero from "../components/billboard/BillboardHero";
import { getBanner } from "../helpers/browseHelper";
const browse = () => {
  return (
    <>
      {console.log("billboard render")}
      <BillboardHero />
    </>
  );
};

export default browse;

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

import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Player from "../../components/billboard/Player";
import { getTrailer } from "../../helpers/browseHelper";
export const PlayerPage = () => {
  const router = useRouter();
  console.log(router);
  const [trailer, setTrailer] = useState(null);
  useEffect(() => {
    const fetchCardData = async () => {
      try {
        console.log(router.query.trailerId);
        const fetchedTrailer = await getTrailer(
          router.query.cat,
          router.query.trailerId
        );
        // "675353"
        console.log("runniung");
        setTrailer(fetchedTrailer);
      } catch (err) {
        if (err.response) {
          console.log(err.response); // response status not at 200 range
        } else {
          console.log(err.message); //no response at all
        }
      }
    };
    console.log(trailer);
    fetchCardData();
    return () => {
      setTrailer(null);
    };
  }, [router.query.trailerId]);

  //x7Krla_UxRg   6sosTNRw_uQ    TWTfhyvzTx0   b9EkMc79ZSU
  return (
    <PlayerBox>
      <Player
        trailer={trailer}
        playing={true}
        player="videoPlayer"
        control={true}
      />
    </PlayerBox>
  );
};
export default PlayerPage;
const PlayerBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  z-index: 10;
  overflow: hidden;
`;

import React, { useState, useEffect, useLayoutEffect } from "react";

import Player from "../components/billboard/Player";
import { getTrailer } from "../helpers/browseHelper";
const testplayer = () => {
  // const [showVideo, setShowVideo] = useState(false);
  const [trailer, setTrailer] = useState(null);
  useEffect(() => {
    const fetchTrailer = async () => {
      const fetchedTrailer = await getTrailer("movies", 297762);
      setTrailer(fetchedTrailer);
    };
    fetchTrailer();
  }, []);
  console.log(trailer);
  // useLayoutEffect(() => {
  //   setShowVideo(true);
  // }, []);
  return (
    <>
      123
      {/* {console.log("123")} */}
      {trailer && <Player trailer={trailer} />}
      {/* <button onClick={clickHandler}>clicked {clicked}</button> */}
    </>
  );
};

export default testplayer;
//

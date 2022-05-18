import React, { useState } from "react";

const usePlayer = () => {
  const [banner, setBanner] = useState(null);
  //   const [trailer, setTrailer] = useState(null);
  const [playCompleted, setPlayCompleted] = useState(false);
  //   const [muted, setMuted] = useState(true);
  const [trailerPlaying, setTrailerPlaying] = useState(false);
  //   const [volume, setVolume] = useState(0.3); //seams no work
  const onEndedHandler = () => {
    setPlayCompleted(true);
    setTrailerPlaying(false);
  };
  //   const volumeHandler = () => {
  //     setMuted((prev) => !prev);
  //   };
  return { banner, setBanner, playCompleted, trailerPlaying, onEndedHandler };
};

export default usePlayer;

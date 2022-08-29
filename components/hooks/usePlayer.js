import React, { useState } from "react";

const usePlayer = () => {
  const [banner, setBanner] = useState(null);
  const [playCompleted, setPlayCompleted] = useState(false);
  const [trailerPlaying, setTrailerPlaying] = useState(false);
  const onEndedHandler = () => {
    setPlayCompleted(true);
    setTrailerPlaying(false);
  };
  return { banner, setBanner, playCompleted, trailerPlaying, onEndedHandler };
};

export default usePlayer;

import React, { useState, useRef } from "react";

export const CardContext = React.createContext();

const CardContextProvider = ({ children }) => {
  const [trailer, setTrailer] = useState(null);
  const [showPlayer, setShowPlayer] = useState({
    isShown: false,
    playerID: null,
    row: null,
  });
  const [timer, setTimer] = useState(null);
  const vPlayer = useRef();

  const cardContextValue = {
    trailer,
    setTrailer,
    showPlayer,
    setShowPlayer,
    timer,
    setTimer,
    vPlayer,
  };
  return (
    <CardContext.Provider value={cardContextValue}>
      {children}
    </CardContext.Provider>
  );
};

export default CardContextProvider;

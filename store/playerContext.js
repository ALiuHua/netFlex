import React, { useState } from "react";

export const PlayerContext = React.createContext({
  activePlayer: "billboard",
  muted: true,
  volume: 0.5,
  toggleMuted: () => {},
  setVolume: (volume) => {},
  setActivePlayer: (player) => {},
});

const PlayerContextProvider = ({ children }) => {
  console.log("player context provider running");
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [activePlayer, setActivePlayer] = useState("billboard");
  const playerContext = {
    activePlayer,
    muted,
    volume,
    toggleMuted: setMuted,
    setVolume,
    setActivePlayer,
  };
  return (
    <PlayerContext.Provider value={playerContext}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;

import React, { useRef } from "react";
import ReactPlayer from "react-player";
import styled, { css } from "styled-components";
// eslint-disable-next-line react/display-name
const Player = React.forwardRef((props, ref) => {
  const { muted, volume, onEnded, onReady, trailer, playing } = props;
  // const player = useRef();

  //player flicking when card player shows.
  return (
    <PlayerWrapper player={props.player}>
      <ReactPlayer
        ref={ref}
        url={`https://www.youtube-nocookie.com/embed/${trailer}`}
        playing={playing}
        width={"100%"}
        height={"100%"}
        muted={muted}
        volume={volume}
        controls={props.control}
        onEnded={onEnded}
        onReady={onReady}
        config={{
          youtube: {
            playerVars: {
              // player not respond to keyboard controls
              disablekb: 1,
              // video annotations not be shown
              iv_load_policy: 3,
              showinfo: 0,
              // start: 30,
            },
          },
        }}
      />
    </PlayerWrapper>
  );
});
export default Player;

const PlayerWrapper = styled.div`
  transform: translate(-50%, -50%);
  ${({ player }) =>
    player !== "videoPlayer" &&
    css`
      pointer-events: none;
    `};
  position: absolute;
  left: 50%;
  top: 50%;

  height: ${({ player }) =>
    player === "card" ? "150%" : player === "billboard" ? "130%" : "115%"};
  /* player === "card" ? "150%" : player === "billboard" ? "130%" : "115%"};  */
  aspect-ratio: 16/9;
  overflow: hidden;
  z-index: 1;
  iframe {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    aspect-ratio: 16/9;

    /* height: 200%; */
    height: ${({ player }) =>
      player === "card" ? "200%" : player === "billboard" ? "100%" : "100%"};
  }
`;

// const PlayerWrapper = styled.div`
//   pointer-events: none;
//   position: absolute;
//   left: 50%;
//   top: 50%;
//   transform: translate(-50%, -50%);
//   width: 125%;
//   aspect-ratio: 16/9;
//   overflow: hidden;
//   z-index: 1;
//   iframe {
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     aspect-ratio: 16/9;

//     /* height: 200%; */
//     height: ${({ activePlayer }) =>
//       activePlayer === "card" ? "200%" : "100%"};
//   }
// `;

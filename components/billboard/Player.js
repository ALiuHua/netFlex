import React, { useRef } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
const Player = React.forwardRef((props, ref) => {
  const { muted, volume, onEnded, onReady, trailer } = props;
  // const player = useRef();
  return (
    <PlayerWrapper>
      <ReactPlayer
        // onReady={() => {
        //   console.log("ready");
        // how to make sure that we can pass loding phase
        // }}
        ref={ref}
        url={`https://www.youtube-nocookie.com/embed/${trailer}`}
        playing
        width={"100%"}
        height={"100%"}
        muted={muted}
        volume={volume}
        // controls
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
  /* width: 500px;
  aspect-ratio: 16/9; */
  /* aspect-ratio: 16/9; */
  pointer-events: none;

  position: absolute;
  /* top: -7%; */
  /* top: -45%; */
  left: 0;
  /* top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* width: 100%; */
  /* height: 100%; */
  width: 100%;
  aspect-ratio: 16/9;
  /* bottom: 0; */
  /* left: 0; */
  /* right: 0; */
  /* & > div {
    height: 115%;
  } */
  
  iframe {
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    aspect-ratio: 16/9;
    height:180%;

    }
  }
`;

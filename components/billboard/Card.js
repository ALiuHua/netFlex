import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { getTrailer } from "../../helpers/browseHelper";
import Player from "./Player";
const Card = ({ category, item }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [trailer, setTrailer] = useState(null);
  const [playCompleted, setPlayCompleted] = useState(false);
  const [muted, setMuted] = useState(true);
  const [trailerPlaying, setTrailerPlaying] = useState(false);
  const [volume, setVolume] = useState(0.1);
  const [timer, setTimer] = useState(null);
  const vPlayer = useRef();
  const hoverHandler = () => {
    const delayPlay = setTimeout(() => {
      const fetchCardData = async () => {
        try {
          const fetchedTrailer = await getTrailer(category, item.id);
          // "675353"
          setTrailer(fetchedTrailer);
        } catch (err) {
          if (err.response) {
            console.log(err.response); // response status not at 200 range
          } else {
            console.log(err.message); //no response at all
          }
        }
      };
      fetchCardData();
    }, 500);
    setTimer(delayPlay);
    console.log(item);
  };
  const onTrailerReady = () => {
    // vPlayer.current.seekTo(20, "seconds"); // can skip to 20s
    if (trailer) {
      setTrailerPlaying(true);
      setPlayCompleted(false);
    }
  };
  const mouseLeaveHandler = () => {
    clearTimeout(timer);
    setTrailer(null);
    setTrailerPlaying(false);
    setPlayCompleted(true);
  };
  const onEndedHandler = () => {
    setPlayCompleted(true);
    setTrailerPlaying(false);
  };

  return (
    <CardWrapper onMouseEnter={hoverHandler} onMouseLeave={mouseLeaveHandler}>
      <MediaContent>
        {!trailerPlaying && (
          <ImgWrapper showDetail={showDetail}>
            <img
              src={`https://image.tmdb.org/t/p/w342/${item?.backdrop_path}`}
            />
          </ImgWrapper>
        )}
        {trailer && (
          <Player
            ref={vPlayer}
            trailer={trailer}
            onEnded={onEndedHandler}
            onReady={onTrailerReady}
            volume={volume}
            muted={muted}
          />
        )}
      </MediaContent>
    </CardWrapper>
  );
};

export default Card;

const CardWrapper = styled.div`
  position: relative;
  box-shadow: rgb(0 0 0 / 75%) 0px 3px 10px;
  aspect-ratio: 16/9;
`;
const MediaContent = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 3px;
  overflow: hidden;
  transition: all 0.3s ease-in-out 0.5s;
  z-index: 1;
  :hover {
    transform: scale(1.5);
    transform-origin: 50% 110%;
    z-index: 100;
  }
`;
const ImgWrapper = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const Description = styled.div`
  transform-origin: 50% 40%;
  position: relative;
  z-index: 5;
  animation: scaling 1s;
  animation-fill-mode: forwards;
  /* transition: all 3s; */
  background-color: red;

  @keyframes scaling {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.3);
    }
  }
  ${(showDetail) => {
    console.log(showDetail);
    return (
      showDetail &&
      css`
        display: block;
      `
    );
  }}
`;

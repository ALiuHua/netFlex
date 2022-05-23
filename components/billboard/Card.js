import React, { useState, useEffect, useRef, useContext } from "react";
import styled, { css } from "styled-components";
import { getTrailer } from "../../helpers/browseHelper";
import Player from "./Player";
import { PlayerContext } from "../../store/playerContext";
import { EmbedButtonBox } from "./BillboardHero";
import { isNewRelease } from "../../helpers/browseHelper";
import { GenreContext } from "../../pages/browse";
const Card = ({ category, item }) => {
  const { muted, volume, activePlayer, setActivePlayer } =
    useContext(PlayerContext);
  const genreCtx = useContext(GenreContext);
  console.log(genreCtx);
  //can also create a context for card component so that we can avoid
  //making each card instance have such states setting.
  const [trailer, setTrailer] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [timer, setTimer] = useState(null);
  const vPlayer = useRef();
  const isNew = isNewRelease(item);

  const genresInfo = item?.genre_ids.map((id, index) => {
    if (index > 2) return null;
    return genreCtx[category].find((genre) => genre.id === id);
  });
  console.log(isNew, item, genresInfo);
  // console.log(genreCtx[category].map(data=>))
  //vote_average  genre_ids
  // to be seosans   pg?  recommondation?

  const hoverHandler = () => {
    const delayPlay = setTimeout(() => {
      const fetchCardData = async () => {
        try {
          const fetchedTrailer = await getTrailer(category, item.id);
          // "675353"
          setTrailer(fetchedTrailer);
          setActivePlayer("card");
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
      setShowPlayer(true);
    }
  };
  const mouseLeaveHandler = () => {
    clearTimeout(timer);
    setTrailer(null);
    setShowPlayer(false);
    setActivePlayer("billboard");
  };
  const onEndedHandler = () => {
    setTrailer(null);
    setShowPlayer(false);
    setActivePlayer("billboard");
  };

  return (
    <CardWrapper onMouseEnter={hoverHandler} onMouseLeave={mouseLeaveHandler}>
      <MediaContent>
        {!showPlayer && (
          <ImgWrapper>
            <img
              src={`https://image.tmdb.org/t/p/w342/${item?.backdrop_path}`}
            />
          </ImgWrapper>
        )}
        {trailer && (
          <>
            <Player
              ref={vPlayer}
              trailer={trailer}
              onEnded={onEndedHandler}
              onReady={onTrailerReady}
              volume={volume}
              muted={muted}
              playing={true}
              activePlayer={activePlayer}
            />
            <EmbedButtonBox
              showPlayer={showPlayer}
              trailer={trailer}
              muted={muted}
              scaled="0.35"
            />
          </>
        )}
      </MediaContent>
      <MediaInfo>
        <MiniTile>{item?.name}</MiniTile>
        <IsNew>{isNewRelease(item) && "new"}</IsNew>
        <GenreTag>
          {genresInfo.map((data, i) => {
            return (
              <>
                {i !== 0 && <span className="dot">&bull;</span>}
                <span className="genreName">{data?.name.split("&")[0]}</span>
              </>
            );
          })}
        </GenreTag>
      </MediaInfo>
    </CardWrapper>
  );
};

export default Card;

const MediaInfo = styled.div`
  width: 100%;
  background-color: orange;
  padding: 12px 24px;
  height: 0px;
  display: none;
  transition: all 1s;
`;
const MiniTile = styled.div``;
const IsNew = styled.div``;
const GenreTag = styled.div`
  display: flex;
  align-items: center;
  .dot {
    color: rgba(245, 245, 245, 0.5);
    font-size: 32px;
    padding: 12px;
  }
`;

const CardWrapper = styled.div`
  position: relative;
  box-shadow: rgb(0 0 0 / 75%) 0px 3px 10px;
  aspect-ratio: 16/9;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.75), 0 6px 6px rgba(0, 0, 0, 0.5);
`;
const MediaContent = styled.div`
  overflow: hidden;
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
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
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
`;

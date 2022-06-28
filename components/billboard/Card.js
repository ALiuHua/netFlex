import React, { useState, useRef, useContext } from "react";
import Image from "next/image";
// import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { trailerActions } from "../../store/trailer-slice";
import { playerActions } from "../../store/player-slice";
// import { CardContext } from "../../store/cardContext";
import {
  MediaInfo,
  MiniTile,
  IsNew,
  GenreTag,
  MediaContent,
  ImgWrapper,
  CardWrapper,
  ActionWrapper,
  DetailIcon,
  DetailButton,
  GradientLayer,
} from "./CardStyle";
import { CirclePlayButton, PlayIcon } from "./BillboardHeroStyle";
import Player from "./Player";
import EmbedButtonBox from "./BillboardHeroStyle";

import { getTrailer } from "../../helpers/browseHelper";
import { withinSliderRange, getItemGenre } from "../../helpers/dataHelper";
import { isNewRelease } from "../../helpers/browseHelper";
import { GenreContext } from "../../pages/browse";

const Card = ({ category, item, onShowMore }) => {
  const dispatch = useDispatch();
  console.log("card runnning");
  const [playerLoaded, setPlayerLoaded] = useState(false);
  const [trailerShow, setTrailerShow] = useState(false);
  const genreCtx = useContext(GenreContext);
  // const { timer, setTimer, vPlayer } = useContext(CardContext);
  const [timer, setTimer] = useState(null);
  const vPlayer = useRef();
  const cardRef = useRef();
  // const router = useRouter();
  const playHandler = () => {
    router.push(`/play/${item.id}`);
    // setActivePlayer("videoPlayer");
  };

  const hoverHandler = (e) => {
    const delayPlay = setTimeout(() => {
      const fetchCardData = async () => {
        try {
          const fetchedTrailer = await getTrailer(category, item.id);
          // "675353"
          dispatch(trailerActions.setTrailer(fetchedTrailer));
          setPlayerLoaded(true);
          console.log("fetch card");
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
  };
  const onTrailerStart = () => {
    // dispatch(trailerActions.setShowPlayer({ ...showPlayer, isShown: true }));
    setTrailerShow(true);
    dispatch(playerActions.toggleActivePlayer("card"));
  };
  const mouseLeaveHandler = (e) => {
    // e.stopPropagation();
    console.log("mouseLeave");
    clearTimeout(timer);
    dispatch(trailerActions.setTrailer(null));
    setPlayerLoaded(false);
    setTrailerShow(false);
    dispatch(playerActions.toggleActivePlayer("billboard"));
  };
  const onEndedHandler = () => {
    dispatch(trailerActions.setTrailer(null));
    setPlayerLoaded(false);
    setTrailerShow(false);
    dispatch(playerActions.toggleActivePlayer("billboard"));
  };
  const moreInfoHandler = () => {
    onShowMore(`/browse?jbv=${item.id}`, item.backdrop_path, item.id);
    setPlayerLoaded(false);
    setTrailerShow(false);
  };
  const isBannerShow = !playerLoaded || !trailerShow;
  // const isPlayerShow = playerLoaded;
  const isPlayerShow = playerLoaded && withinSliderRange(cardRef.current);
  // const isPlayerShow = playerLoaded

  return (
    <CardWrapper
      onMouseEnter={hoverHandler}
      onMouseLeave={mouseLeaveHandler}
      ref={cardRef}
    >
      <MediaContent className="mediaContent">
        {isBannerShow && (
          <ImgWrapper>
            {isNewRelease(item) && <IsNew>New</IsNew>}
            <MiniTile>{item?.name.split(":")[0]}</MiniTile>
            <GradientLayer />
            <Image
              src={`https://image.tmdb.org/t/p/w342/${item?.backdrop_path}`}
              alt="to be continue"
              layout="fill"
              objectFit="cover"
            />
          </ImgWrapper>
        )}
        {isPlayerShow && (
          <>
            <Player
              ref={vPlayer}
              // trailer={trailer}
              onEnded={onEndedHandler}
              onStart={onTrailerStart}
              playing={true}
              player="card"
            />
            <div
              style={{
                position: "absolute",
                zIndex: "5",
                bottom: "0",
                right: "0",
                opacity: "0.5",
              }}
            >
              <EmbedButtonBox showMuteToggling={trailerShow} scaled="0.35" />
            </div>
          </>
        )}
      </MediaContent>
      <MediaInfo className="mediaInfo">
        <ActionWrapper>
          <CirclePlayButton onClick={playHandler}>
            <PlayIcon />
          </CirclePlayButton>
          <DetailButton onClick={moreInfoHandler}>
            <DetailIcon />
          </DetailButton>
        </ActionWrapper>
        <GenreTag>
          {getItemGenre(item?.genre_ids, genreCtx, 3, category).map(
            (data, i) => {
              return (
                data && (
                  <React.Fragment key={i}>
                    {i !== 0 && <span className="dot">&bull;</span>}
                    <span className="genreName">
                      {data?.name.split("&")[0]}
                    </span>
                  </React.Fragment>
                )
              );
            }
          )}
        </GenreTag>
      </MediaInfo>
    </CardWrapper>
  );
};

export default Card;

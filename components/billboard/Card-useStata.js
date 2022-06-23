import React, { useState, useEffect, useRef, useContext } from "react";
import { CirclePlayButton, PlayIcon } from "./BillboardHeroStyle";
import Image from "next/image";
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
import { getTrailer } from "../../helpers/browseHelper";
import Player from "./Player";
import { PlayerContext } from "../../store/playerContext";
import EmbedButtonBox from "./BillboardHeroStyle";
import { isNewRelease } from "../../helpers/browseHelper";
import { GenreContext } from "../../pages/browse";
import { CardContext } from "../../store/cardContext";
import { useRouter } from "next/router";
import { withinSliderRange, getItemGenre } from "../../helpers/dataHelper";
const Card = ({ category, item, rowNumber, onShowMore }) => {
  const { muted, volume, activePlayer, setActivePlayer } =
    useContext(PlayerContext);
  const genreCtx = useContext(GenreContext);
  // const {
  //   trailer,
  //   setTrailer,
  //   showPlayer,
  //   setShowPlayer,
  //   timer,
  //   setTimer,
  //   vPlayer,
  // } = useContext(CardContext);
  const [trailer, setTrailer] = useState(null);
  const [showPlayer, setShowPlayer] = useState({
    isShown: false,
    playerID: null,
    row: null,
  });
  const [timer, setTimer] = useState(null);
  const vPlayer = useRef();
  const cardRef = useRef();
  const router = useRouter();
  const playHandler = () => {
    if (trailer) setTrailer(trailer);
    router.push(`/play/${item.id}`);
    // setActivePlayer("videoPlayer");
  };
  console.log("card Running");
  const hoverHandler = (e) => {
    const delayPlay = setTimeout(() => {
      const fetchCardData = async () => {
        try {
          const fetchedTrailer = await getTrailer(category, item.id);
          // "675353"
          setTrailer(fetchedTrailer);
          setShowPlayer({
            isShown: false,
            playerID: item.id,
            row: rowNumber,
          });
          setActivePlayer("card"); //why this still can triggler 187 rerenders
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
    setShowPlayer({ ...showPlayer, isShown: true });
  };
  const mouseLeaveHandler = (e) => {
    // e.stopPropagation();
    clearTimeout(timer);
    setTrailer(null);
    setShowPlayer({ isShown: false, playerID: null, row: null });
    // setActivePlayer("billboard");
  };
  const onEndedHandler = () => {
    setTrailer(null);
    setShowPlayer({ isShown: false, playerID: null, row: null });
    setActivePlayer("billboard");
  };
  const moreInfoHandler = () => {
    setShowPlayer({ isShown: false, playerID: null, row: null });
    onShowMore(item.backdrop_path, item.id);
  };
  const isBannerShow =
    !showPlayer.isShown ||
    showPlayer.playerID !== item.id ||
    showPlayer.row !== rowNumber;
  // const isPlayerShow =
  //   trailer && showPlayer.playerID === item.id && showPlayer.row === rowNumber;
  const isPlayerShow =
    trailer &&
    showPlayer.playerID === item.id &&
    showPlayer.row === rowNumber &&
    withinSliderRange(cardRef.current);
  trailer &&
    showPlayer.playerID === item.id &&
    showPlayer.row === rowNumber &&
    withinSliderRange(cardRef.current) &&
    console.log(isPlayerShow);
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
              trailer={trailer}
              onEnded={onEndedHandler}
              onStart={onTrailerStart}
              volume={volume}
              muted={muted}
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
              <EmbedButtonBox
                showMuteToggling={showPlayer.isShown}
                muted={muted}
                scaled="0.35"
              />
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

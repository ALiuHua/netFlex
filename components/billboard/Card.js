import React, { useState, useEffect, useRef, useContext } from "react";
import { CirclePlayButton, PlayIcon } from "./BillboardHeroStyle";
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
const Card = ({ category, item, rowNumber, number, onShowMore }) => {
  const { muted, volume, activePlayer, setActivePlayer } =
    useContext(PlayerContext);
  const genreCtx = useContext(GenreContext);
  const {
    trailer,
    setTrailer,
    showPlayer,
    setShowPlayer,
    timer,
    setTimer,
    vPlayer,
  } = useContext(CardContext);
  const cardRef = useRef();
  // console.log(cardRef.current);
  const withinSliderRange = (itemNode, itemsNum) => {
    const ItemIndex = itemNode.closest(".slick-slide").dataset.index;
    return ItemIndex < itemsNum;
  };
  const router = useRouter();
  const playHandler = () => {
    if (trailer) setTrailer(trailer);
    router.push(`/play/${item.id}`);
  };
  const genresInfo = item?.genre_ids.map((id, index) => {
    if (index > 2) return null;
    return genreCtx[category].find((genre) => genre.id === id);
  });
  const hoverHandler = () => {
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
  };
  const onTrailerStart = () => {
    setShowPlayer({ ...showPlayer, isShown: true });
  };
  const mouseLeaveHandler = (e) => {
    // e.stopPropagation();
    clearTimeout(timer);
    setTrailer(null);
    if (activePlayer === "previewPlayer") return;
    setShowPlayer({ isShown: false, playerID: null, row: null });
    console.log("mouseLeave", trailer, activePlayer);
    setActivePlayer("billboard");
  };
  const onEndedHandler = () => {
    setTrailer(null);
    setShowPlayer({ isShown: false, playerID: null, row: null });
    setActivePlayer("billboard");
  };
  const moreInfoHandler = () => {
    setShowPlayer({ isShown: false, playerID: null, row: null });
    setActivePlayer("previewPlayer");
    console.log("query test runnning");
    if (trailer) setTrailer(trailer);
    router.push({ pathname: "/browse", query: { jbv: item.id } });
    console.log("showMore", trailer);
    onShowMore();
  };
  const isBannerShow =
    !showPlayer.isShown ||
    showPlayer.playerID !== item.id ||
    showPlayer.row !== rowNumber;
  const isPlayerShow =
    trailer &&
    showPlayer.playerID === item.id &&
    showPlayer.row === rowNumber &&
    withinSliderRange(cardRef.current, number);
  return (
    <CardWrapper
      onMouseEnter={hoverHandler}
      onMouseLeave={mouseLeaveHandler}
      ref={cardRef}
    >
      <MediaContent className="mediaContent">
        {showPlayer.playerID === item.id &&
          console.log(isBannerShow, isPlayerShow)}
        {isBannerShow && (
          <ImgWrapper>
            {isNewRelease(item) && <IsNew>New</IsNew>}
            <MiniTile>{item?.name.split(":")[0]}</MiniTile>
            <GradientLayer />
            <img
              src={`https://image.tmdb.org/t/p/w342/${item?.backdrop_path}`}
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
            <EmbedButtonBox
              showMuteToggling={showPlayer.isShown}
              muted={muted}
              scaled="0.35"
            />
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
          {genresInfo.map((data, i) => {
            return (
              <React.Fragment key={i}>
                {i !== 0 && <span className="dot">&bull;</span>}
                <span className="genreName">{data?.name.split("&")[0]}</span>
              </React.Fragment>
            );
          })}
        </GenreTag>
      </MediaInfo>
    </CardWrapper>
  );
};

export default Card;

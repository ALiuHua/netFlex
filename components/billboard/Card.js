import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { trailerActions } from "../../store/trailer-slice";
import { playerActions } from "../../store/player-slice";
import { getTrailer, isNewRelease } from "../../helpers/browseHelper";
import { detailsActions } from "../../store/detailsSlice";
import CardDetail from "./CardDetail";
import {
  MediaInfo,
  MiniTitle,
  IsNew,
  MediaContent,
  ImgWrapper,
  CardWrapper,
  GradientLayer,
} from "./CardStyle";
import EmbedButtonBox from "../ui/Buttons";

import Player from "./Player";
import styled from "styled-components";

const Card = ({ item, onShowMore, onUpdateList }) => {
  const dispatch = useDispatch();
  const [playerLoaded, setPlayerLoaded] = useState(false);
  const [trailerShow, setTrailerShow] = useState(false);
  const [timer, setTimer] = useState(null);
  const vPlayer = useRef();
  const cardRef = useRef();
  const [location, setLocation] = useState("middle");
  const [mouseOnCard, setMouseOnCard] = useState(false);
  const mouseOnCardRef = useRef();
  mouseOnCardRef.current = mouseOnCard;
  const playHandler = () => {
    dispatch(
      detailsActions.setItemDetails({
        posterPath: item.backdrop_path,
      })
    );
    onShowMore(`/play/${item.id}?cat=${item.category}`);
  };
  useEffect(() => {
    return () => {
      setMouseOnCard(false);
    };
  }, []);
  const hoverHandler = (e) => {
    setMouseOnCard(true);
    const delayPlay = setTimeout(() => {
      const fetchCardData = async () => {
        try {
          const fetchedTrailer = await getTrailer(item.category, item.id);
          if (mouseOnCardRef.current) {
            dispatch(trailerActions.setTrailer(fetchedTrailer));
            dispatch(playerActions.toggleActivePlayer("card"));
            setPlayerLoaded(true);
          } else {
            console.log("cancled");
          }
        } catch (err) {
          if (err.response) {
            console.log(err.response); // response status not at 200 range
          } else {
            console.log(err.message); //no response at all
          }
        }
      };
      fetchCardData();
    }, 2000);
    const redc = e.target.getBoundingClientRect();
    if (redc.x < redc.width) setLocation("left");
    if (redc.x + 2 * redc.width > document.body.offsetWidth)
      setLocation("right");
    setTimer(delayPlay);
  };
  const onTrailerStart = () => {
    setTrailerShow(true);
  };
  const mouseLeaveHandler = (e) => {
    setMouseOnCard(false);
    clearTimeout(timer);
    dispatch(trailerActions.setTrailer(null));
    if (window.location.href.includes("jbv=")) return;
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
  const moreInfoHandler = (e) => {
    const urlPathOriginal = `${window.location.pathname}${window.location.search}`;
    let updatedUrlPath;
    if (urlPathOriginal.includes("?")) {
      updatedUrlPath = `${urlPathOriginal}&jbv=${item.id}&cat=${item.category}`;
    } else {
      updatedUrlPath = `${urlPathOriginal}?jbv=${item.id}&cat=${item.category}`;
    }

    onShowMore(updatedUrlPath, urlPathOriginal);
    dispatch(
      detailsActions.setItemDetails({
        posterPath: item.backdrop_path,
      })
    );
    dispatch(playerActions.toggleActivePlayer("detailsPlayer"));
    if (playerLoaded)
      dispatch(
        playerActions.setPlayedTime(
          Math.floor(vPlayer?.current.getCurrentTime())
        )
      );
    setPlayerLoaded(false);
    setTrailerShow(false);
  };
  const isBannerShow = !playerLoaded || !trailerShow;
  const isPlayerShow = playerLoaded;
  return (
    <CardWrapper
      onMouseEnter={hoverHandler}
      onMouseLeave={mouseLeaveHandler}
      ref={cardRef}
      location={location}
    >
      <MediaContent
        className="mediaContent"
        onClick={() => {
          playHandler();
          mouseLeaveHandler();
        }}
      >
        {isBannerShow && (
          <ImgWrapper>
            {isNewRelease(item) && <IsNew>New</IsNew>}
            <MiniTitle>
              {item?.title?.split(":")[0] || item?.name?.split(":")[0]}
            </MiniTitle>
            <GradientLayer />
            <Image
              src={`https://image.tmdb.org/t/p/w342/${item?.backdrop_path}`}
              alt={item?.name}
              layout="fill"
              objectFit="cover"
            />
          </ImgWrapper>
        )}
        {isPlayerShow && (
          <>
            <Player
              ref={vPlayer}
              onEnded={onEndedHandler}
              onStart={onTrailerStart}
              playing={true}
              player="card"
            />
            <ButtonWrapper>
              <EmbedButtonBox showMuteToggling={trailerShow} />
            </ButtonWrapper>
          </>
        )}
      </MediaContent>

      <MediaInfo
        className="mediaInfo"
        onClick={() => {
          moreInfoHandler();
        }}
      >
        {mouseOnCard && (
          <CardDetail
            onPlay={playHandler}
            onMoreInfo={moreInfoHandler}
            item={item}
            onUpdateList={onUpdateList}
          />
        )}
      </MediaInfo>
    </CardWrapper>
  );
};

export default Card;

export const ButtonWrapper = styled.div`
  position: absolute;
  z-index: 5;
  bottom: 0px;
  right: 0px;

  button {
    transform: scale(0.45);
  }
`;

import React, { useState, useRef, useEffect, useContext } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { trailerActions } from "../../store/trailer-slice";
import { playerActions } from "../../store/player-slice";
import { getTrailer, isNewRelease } from "../../helpers/browseHelper";
import { detailsActions } from "../../store/detailsSlice";
import CardDetail from "./CardDetail";
import {
  MediaInfo,
  MiniTile,
  IsNew,
  MediaContent,
  ImgWrapper,
  CardWrapper,
  GradientLayer,
} from "./CardStyle";
import EmbedButtonBox, { MuteButton } from "../ui/Buttons";

import Player from "./Player";
import styled from "styled-components";

const Card = ({ item, onShowMore, onUpdateList }) => {
  // const session = useSession();//will use session trigger re-render????
  // console.log(session);
  const dispatch = useDispatch();
  console.log("card running");
  const [playerLoaded, setPlayerLoaded] = useState(false);
  const [trailerShow, setTrailerShow] = useState(false);
  const [timer, setTimer] = useState(null);
  const vPlayer = useRef();
  const cardRef = useRef();
  const [location, setLocation] = useState("middle");
  const [mouseOnCard, setMouseOnCard] = useState(false);
  const mouseOnCardRef = useRef();
  //=====we need this value, because we may hover and leave this card reptivly..
  mouseOnCardRef.current = mouseOnCard;
  // const currentUser = useSelector((state) => state.users.email);
  // const currentProfile = useSelector((state) => state.users.selectedProfile);
  const playHandler = () => {
    dispatch(
      detailsActions.setItemDetails({
        posterPath: item.backdrop_path,
        // itemCategory: item.category,
      })
    );
    onShowMore(`/play/${item.id}?cat=${item.category}`);
    console.log("handler running");
    // onShowMore(`/browse?jbv=${item.id}`, item.backdrop_path, item.id);
  };
  useEffect(() => {
    // this is the way we resolce the problem that we may update the list when we remove the card in mylist page. without we will get
    //error because we may update trailer info after we delete the card
    return () => {
      console.log("mouseLeave1");
      setMouseOnCard(false);
    };
  }, []);
  const hoverHandler = (e) => {
    setMouseOnCard(true);
    const delayPlay = setTimeout(() => {
      const fetchCardData = async () => {
        try {
          console.log("fetch card");
          const fetchedTrailer = await getTrailer(item.category, item.id);
          // "675353"
          console.log(mouseOnCardRef.current);

          if (mouseOnCardRef.current) {
            console.log(mouseOnCardRef.current);
            dispatch(trailerActions.setTrailer(fetchedTrailer));
            console.log("fetch card2");
            dispatch(playerActions.toggleActivePlayer("card"));
            console.log("fetch card3");
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
      // const checkListed = async () => {};
    }, 2000);
    const redc = e.target.getBoundingClientRect();
    if (redc.x < redc.width) setLocation("left");
    if (redc.x + 2 * redc.width > document.body.offsetWidth)
      setLocation("right");

    setTimer(delayPlay);
  };
  const onTrailerStart = () => {
    // dispatch(trailerActions.setShowPlayer({ ...showPlayer, isShown: true }));
    setTrailerShow(true);
  };
  const mouseLeaveHandler = (e) => {
    // e.stopPropagation();
    console.log("mouseLeave1");
    setMouseOnCard(false);
    clearTimeout(timer);
    console.log("mouseLeave2");
    dispatch(trailerActions.setTrailer(null));
    console.log("mouseLeave3");
    //need prevent the following code when clicked the more info button
    //werid bug:  maybe because 当我们鼠标移开时，settimeout中的函数已经开始调用，但这个函数是异步的，
    //即使后面取消了timer也无法阻止当异步fetch完成时fetched data被更新在redux中；
    if (window.location.href.includes("jbv=")) return;
    console.log("mouseLeave4");
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
  // const addToListHandler = async () => {
  //   console.log("handlerRunning");
  //   const response = await fetch("/api/auth/addToList", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       data: item,
  //       // user: JSON.parse(localStorage.getItem("netflex")).email,
  //       // profileName: JSON.parse(localStorage.getItem("netflex")).profile
  //       //   .profileName,
  //       user: currentUser,
  //       profileName: currentProfile.profileName,
  //       action: "remove",
  //     }),
  //     headers: { "Content-Type": "application/json" },
  //   });
  //   const data = await response.json();
  //   console.log(response, data);
  // };
  const moreInfoHandler = (e) => {
    console.log(" moreInfoHandler running");
    // const router = useRouter(); this can not use cus will trigger card rendering;
    console.log(window.location);
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
        // itemCategory: item.category,
      })
    );
    // onShowMore(`/browse?jbv=${item.id}`, item.backdrop_path, item.id);
    dispatch(playerActions.toggleActivePlayer("detailsPlayer"));
    if (playerLoaded)
      dispatch(
        playerActions.setPlayedTime(
          Math.floor(vPlayer?.current.getCurrentTime())
        )
      );
    setPlayerLoaded(false);
    setTrailerShow(false);
    //
    if (!e) e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
  };
  // this is not working, 1. what kind of situation will trigger clashing. 2. why e.stop can work.
  // 2. why media play not print out

  const isBannerShow = !playerLoaded || !trailerShow;
  // const isPlayerShow = playerLoaded;
  const isPlayerShow = playerLoaded;
  // const isPlayerShow = playerLoaded && withinSliderRange(cardRef.current);
  // const isPlayerShow = playerLoaded
  // useEffect(() => {
  //   const redc = cardRef.getBoundingClientRect();
  //   if (redc.x < redc.width) setLocation("left");
  //   if (redc.x + 2 * redc.width > document.body.offsetWidth)
  //     setLocation("right");
  //   console.log(redc, document.body.offsetWidth);
  // }, []);
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
          console.log("clicked"), playHandler();
          mouseLeaveHandler();
        }}
      >
        {isBannerShow && (
          <ImgWrapper>
            {isNewRelease(item) && <IsNew>New</IsNew>}
            <MiniTile>
              {item?.title?.split(":")[0] || item?.name?.split(":")[0]}
            </MiniTile>
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
              // trailer={trailer}
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
          console.log("media info out");
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

import React, { useState, useEffect, useContext, useRef } from "react";
// import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// import Router from "next/router";
import Image from "next/image";
import { useRouter } from "next/router";
import { getBanner, getTrailer } from "../../helpers/browseHelper";
import Player from "./Player";
import {
  BillboardContent,
  BillboardWrapper,
  BillboardBackground,
  GradientLayerAdd,
  BillboardDetail,
  DescriptionContainer,
  Description,
  ActionBox,
  PlayButton,
  PlayIcon,
  MoreInfoButton,
  InfoIcon,
} from "./BillboardHeroStyle";
import EmbedButtonBox from "./BillboardHeroStyle";
import { playerActions } from "../../store/player-slice";
import { detailsActions } from "../../store/detailsSlice";
export const briefInfo = (infoText, num) => {
  let shortInfo;
  if (infoText) {
    shortInfo =
      infoText
        .split(" ")
        .slice(0, num - 1)
        .join(" ") + "...";
  } else {
    shortInfo = null;
  }
  return shortInfo;
};

const BillboardHero = ({ category, onShowMore }) => {
  //category ==movies/Tvshows
  const activePlayer = useSelector((state) => state.player.activePlayer);
  const dispatch = useDispatch();
  const [banner, setBanner] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [playCompleted, setPlayCompleted] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false); // this playce has a bug
  const [playing, setPlaying] = useState(true); //only here
  const vPlayer = useRef();
  const router = useRouter();
  const playHandler = () => {
    onShowMore(`/play/${banner.id}?cat=${banner.category}`);
  };
  const moreInfoHandler = () => {
    onShowMore(`/browse?jbv=${banner.id}&cat=${banner.category}`);
    dispatch(
      detailsActions.setItemDetails({
        posterPath: banner.backdrop_path,
        // itemCategory: banner.category,
      })
    );
    if (showPlayer)
      dispatch(
        playerActions.setPlayedTime(
          Math.floor(vPlayer?.current.getCurrentTime())
        )
      );
    dispatch(playerActions.toggleActivePlayer("detailsPlayer"));
  };
  const onEndedHandler = () => {
    setPlayCompleted(true);
    setShowPlayer(false);
  };
  console.log("billboard running");
  useEffect(() => {
    console.log("billboard useEffect running 1");

    let timeoutId;
    const fetchBillboard = async () => {
      console.log("fetched");
      try {
        const bannerData = await getBanner(category);
        console.log(category, bannerData);
        setBanner(bannerData);
        const fetchedTrailer = await getTrailer(
          bannerData.category,
          bannerData.id
        );
        timeoutId = setTimeout(() => {
          setTrailer(fetchedTrailer);
          setPlayCompleted(false);
        }, 1000);
      } catch (err) {
        if (err.response) {
          console.log(err.response);
        } else {
          console.log(err.message);
        }
      }
    };
    fetchBillboard();
    return () => {
      clearTimeout(timeoutId);
    };
  }, [category]);
  useEffect(() => {
    setPlaying(true);
    if (activePlayer !== "billboard" && showPlayer) {
      setPlaying(false);
    }
    console.log("billboard useEffect running 2");
  }, [activePlayer, showPlayer]);
  useEffect(() => {
    if (router.query.jbv)
      dispatch(playerActions.toggleActivePlayer("detailsPlayer"));
  }, [router.query.jbv]);

  const replayHandler = () => {
    setTrailer(trailer);
    setPlayCompleted(false);
    console.log(trailer, showPlayer);
  };
  return (
    <BillboardWrapper>
      <BillboardContent>
        <GradientLayerAdd />
        {!playCompleted && trailer && (
          <Player
            trailer={trailer}
            onEnded={onEndedHandler}
            playing={playing}
            player="billboard"
            ref={vPlayer}
            onStart={() => {
              if (trailer) {
                setShowPlayer(true);
              }
            }}
          />
        )}
        {/* {!showPlayer && banner && (
          <BillboardBackground banner={banner}>
          </BillboardBackground>
        )} */}

        {!showPlayer && banner && (
          <CoverImage coverPath={banner?.backdrop_path} size="original" altInfo={banner?.name}/>
        )}
      </BillboardContent>
      <BillboardDetail>
        {banner && (
          <DescriptionContainer>
            <Description showPlayer={showPlayer}>
              <h1>{banner?.name || banner?.original_name || banner?.title}</h1>
              <p>{briefInfo(banner.overview, 20)}</p>
            </Description>
            <ActionBox>
              <PlayButton onClick={playHandler}>
                <PlayIcon /> <span>Play</span>
              </PlayButton>
              <MoreInfoButton onClick={moreInfoHandler}>
                <InfoIcon /> <span>More Info</span>
              </MoreInfoButton>
            </ActionBox>
          </DescriptionContainer>
        )}
        <div>
          <EmbedButtonBox
            showReplay={!showPlayer && playCompleted}
            showMuteToggling={showPlayer}
            replayHandler={replayHandler}
          />
        </div>
      </BillboardDetail>
    </BillboardWrapper>
  );
};

export default BillboardHero;
export const CoverImage = ({ coverPath, size, altInfo,children }) => {
  return (
    <BillboardBackground>
      {children}
      <Image
        src={`https://image.tmdb.org/t/p/${size}${coverPath}`}
        alt={altInfo}
        layout="fill"
        objectFit="cover"
        priority
      />
    </BillboardBackground>
  );
};

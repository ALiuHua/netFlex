import React, { useState, useEffect, useContext } from "react";
// import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// import Router from "next/router";
import Image from "next/image";
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
  const activePlayer = useSelector((state) => state.player.activePlayer);
  const dispatch = useDispatch();

  const [banner, setBanner] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [playCompleted, setPlayCompleted] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [playing, setPlaying] = useState(true); //only here
  // const [getDistracted,setGetDistracted] = useState(false);
  // const router = useRouter();
  const playHandler = () => {
    // setActivePlayer("videoPlayer");
    onShowMore(`/play/${banner.id}`);
    // router.push(`/play/${banner.id}`); //60574
  };
  const moreInfoHandler = () => {
    onShowMore(`/browse?jbv=${banner.id}`, banner.backdrop_path, banner.id);
  };
  const onEndedHandler = () => {
    setPlayCompleted(true);
    setShowPlayer(false);
  };
  console.log("billboard running");
  useEffect(() => {
    console.log("billboard useEffect running 1");
    // setActivePlayer("billboard");
    // dispatch(playerActions.toggleActivePlayer());
    let timeoutId;
    const fetchBillboard = async () => {
      console.log("fetched");
      try {
        const bannerData = await getBanner(category);
        setBanner(bannerData);
        const fetchedTrailer = await getTrailer(category, bannerData.id);
        timeoutId = setTimeout(() => {
          setTrailer(fetchedTrailer);
          // setShowPlayer(true);
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
    // if (activePlayer !== "billboard" && showPlayer) {
    //   setBillboard(false);
    // }
  }, [activePlayer, showPlayer]);
  const replayHandler = () => {
    setTrailer(trailer);
    setPlayCompleted(false);
    console.log(trailer, showPlayer);
    // setShowPlayer(true);
  };
  return (
    <BillboardWrapper>
      <BillboardContent>
        <GradientLayerAdd />
        {/* {showPlayer && trailer && ( */}
        {!playCompleted && trailer && (
          <Player
            trailer={trailer}
            onEnded={onEndedHandler}
            playing={playing}
            player="billboard"
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
          <CoverImage coverPath={banner?.backdrop_path} size="original" />
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
export const CoverImage = ({ coverPath, size, children }) => {
  return (
    <BillboardBackground>
      {children}
      <Image
        src={`https://image.tmdb.org/t/p/${size}${coverPath}`}
        alt="billboard banner"
        layout="fill"
        objectFit="cover"
        priority
      />
    </BillboardBackground>
  );
};

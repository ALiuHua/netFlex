import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { PlayerContext } from "../../store/playerContext";
import { CardContext } from "../../store/cardContext";
// import Router from "next/router";
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
const briefInfo = (infoText, num) => {
  const shortInfo =
    infoText
      .split(" ")
      .slice(0, num - 1)
      .join(" ") + "...";
  return shortInfo;
};

const BillboardHero = ({ category, onShowMore }) => {
  const { muted, volume, setVolume, activePlayer, setActivePlayer } =
    useContext(PlayerContext);
  const [banner, setBanner] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [playCompleted, setPlayCompleted] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [playing, setPlaying] = useState(true); //only here
  // const [getDistracted,setGetDistracted] = useState(false);
  const router = useRouter();
  const { setTrailer: setPlayerTrailer } = useContext(CardContext);
  const playHandler = () => {
    setActivePlayer("videoPlayer");
    if (trailer) setPlayerTrailer(trailer);
    router.push(`/play/${banner.id}`);
  };
  const moreInfoHandler = () => {
    setActivePlayer("previewPlayer");
    console.log("query test runnning");
    if (trailer) setPlayerTrailer(trailer);
    router.push({ pathname: "/browse", query: { jbv: banner.id } });
    onShowMore();
  };
  const onEndedHandler = () => {
    setPlayCompleted(true);
    setShowPlayer(false);
  };
  useEffect(() => {
    setActivePlayer("billboard");
    let timeoutId;
    const fetchBillboard = async () => {
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
            volume={volume}
            muted={muted}
            playing={playing}
            player="billboard"
            onStart={() => {
              console.log("onStart", trailer, showPlayer);
              if (trailer) {
                setShowPlayer(true);
              }
            }}
          />
        )}
        {!showPlayer && banner && (
          <BillboardBackground banner={banner}>
            {/* <GradientLayer /> */}
          </BillboardBackground>
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
        <EmbedButtonBox
          showPlayer={showPlayer}
          trailer={trailer}
          replayHandler={replayHandler}
          playCompleted={playCompleted}
        />
      </BillboardDetail>
    </BillboardWrapper>
  );
};

export default BillboardHero;

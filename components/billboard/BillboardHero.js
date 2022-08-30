import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
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
} from "./BillboardHeroStyle";
import { PlayButton, MoreInfoButton } from "../ui/Buttons";
import EmbedButtonBox from "../ui/Buttons";
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

const BillboardHero = ({ category, onShowMore, setShowLoadingSpinner }) => {
  const activePlayer = useSelector((state) => state.player.activePlayer);
  const dispatch = useDispatch();
  const [banner, setBanner] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [playCompleted, setPlayCompleted] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [playing, setPlaying] = useState(true);
  const vPlayer = useRef();
  const router = useRouter();
  const playHandler = () => {
    dispatch(
      detailsActions.setItemDetails({
        posterPath: banner.backdrop_path,
      })
    );
    onShowMore(`/play/${banner.id}?cat=${banner.category}`);
  };
  const moreInfoHandler = () => {
    const urlPathOriginal = `${window.location.pathname}${window.location.search}`;
    let updatedUrlPath;
    if (urlPathOriginal.includes("?")) {
      updatedUrlPath = `${urlPathOriginal}&jbv=${banner.id}&cat=${banner.category}`;
    } else {
      updatedUrlPath = `${urlPathOriginal}?jbv=${banner.id}&cat=${banner.category}`;
    }

    onShowMore(updatedUrlPath, urlPathOriginal);

    dispatch(
      detailsActions.setItemDetails({
        posterPath: banner.backdrop_path,
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

  useEffect(() => {
    let timeoutId;
    dispatch(playerActions.toggleActivePlayer("billboard"));
    const fetchBillboard = async () => {
      try {
        const bannerData = await getBanner(category);

        setBanner(bannerData);
        const fetchedTrailer = await getTrailer(
          bannerData.category,
          bannerData.id
        );

        timeoutId = setTimeout(() => {
          setShowLoadingSpinner(false);
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
  }, [activePlayer, showPlayer]);
  useEffect(() => {
    if (router.query.jbv)
      dispatch(playerActions.toggleActivePlayer("detailsPlayer"));
  }, [router.query.jbv]);

  const replayHandler = () => {
    setTrailer(trailer);
    setPlayCompleted(false);
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
        {!showPlayer && banner && (
          <CoverImage
            coverPath={banner?.backdrop_path}
            size="original"
            altInfo={banner?.name}
          />
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
                <span>Play</span>
              </PlayButton>
              <MoreInfoButton onClick={moreInfoHandler}>
                <span>More Info</span>
              </MoreInfoButton>
            </ActionBox>
          </DescriptionContainer>
        )}
        <ActionBox>
          <EmbedButtonBox
            showReplay={!showPlayer && playCompleted}
            showMuteToggling={showPlayer}
            replayHandler={replayHandler}
            scaled={1}
          />
        </ActionBox>
      </BillboardDetail>
    </BillboardWrapper>
  );
};
export default BillboardHero;
export const CoverImage = ({ coverPath, size, altInfo, children }) => {
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

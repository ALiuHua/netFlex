import React, { useState, useEffect, useContext } from "react";
import { CoverImage } from "../billboard/BillboardHero";
import { useRouter } from "next/router";
import styled from "styled-components";
import Player from "../billboard/Player";
import { CardContext } from "../../store/cardContext";
import { PlayerContext } from "../../store/playerContext";
import { ActionWrapper } from "../billboard/CardStyle";
import { CirclePlayButton, PlayIcon } from "../Billboard/BillboardHeroStyle";
import EmbedButtonBox from "../billboard/BillboardHeroStyle";
import { GradientLayerAdd } from "../billboard/BillboardHeroStyle";
import Description from "./Description";
import { getDetails } from "../../helpers/browseHelper";
import Episodes from "./Episodes";
const MoreInfo = ({ category, onShowMore, genreContext, previewPoster }) => {
  const router = useRouter();
  const [banner, setBanner] = useState(null);
  const { trailer, setTrailer, showPlayer, setShowPlayer } =
    useContext(CardContext);
  const [cast, setCast] = useState(null);
  const { muted, toggleMuted, volume, activePlayer, setActivePlayer } =
    useContext(PlayerContext);
  const playHandler = () => {
    if (trailer) setTrailer(trailer);
    router.push(`/play/${banner.id}`);
  };
  console.log(trailer, banner, showPlayer.isShown);
  useEffect(() => {
    console.log("More info useEffect");
    const getPreviewDetail = async () => {
      const {
        details,
        castData,
        trailer: currentTrailer,
      } = await getDetails("TVShows", router.query.jbv);
      setShowPlayer({ isShown: true, playerID: null, row: null });
      setBanner(details);
      setTrailer(currentTrailer);
      setCast(castData);
      //   setShowPlayer({ isShown: true, playerID: null, row: null });
    };
    if (router.query.jbv) getPreviewDetail();
    return () => {
      setShowPlayer({ isShown: false, playerID: null, row: null });
    }; // for temporary
  }, [router.query.jbv]);
  const onEndedHandler = () => {
    setShowPlayer({ isShown: false, playerID: null, row: null });
  };
  return (
    <>
      <ContentWrapper>
        <BackDrop
          onClick={() => {
            onShowMore();
            setTrailer(null);
            setShowPlayer({ isShown: false, playerID: null, row: null }); // for temporary
            setActivePlayer("billboard");
            router.push("/browse", undefined, { shallow: true });
          }}
        />
        <Content>
          <PreviewPlayer>
            <GradientLayerAdd />
            {trailer && (
              <Player
                trailer={trailer}
                muted={muted}
                playing={true}
                player="billboard"
                onEnded={onEndedHandler}
              />
            )}
            {!showPlayer.isShown && (banner || previewPoster) && (
              <CoverImage
                coverPath={
                  banner?.backdrop_path || previewPoster?.backdrop_path
                }
              />
            )}
          </PreviewPlayer>

          <ActionsBox>
            <ActionWrapper>
              <CirclePlayButton onClick={playHandler}>
                <PlayIcon />
              </CirclePlayButton>
            </ActionWrapper>
            <EmbedButtonBox showMuteToggling={true} scaled={0.45} />
          </ActionsBox>
        </Content>
        <RelatedInfoContainer>
          <Description
            category={category}
            details={banner}
            genreContext={genreContext}
            cast={cast}
          />
          {banner && <Episodes details={banner} />}
        </RelatedInfoContainer>
      </ContentWrapper>
    </>
  );
};

export default MoreInfo;
const BackDrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  background: rgba(0, 0, 0, 0.2);
  z-index: -1;
`;
const ContentWrapper = styled.div`
  position: fixed;
  top: 3.6rem;
  left: 25vw;
  /* right: 15vw; */
  /* transform: translateX(-50%); */
  width: 50vw;
  z-index: 999999;
  height: 96.4vh;
  overflow-y: scroll;
  border-radius: 8px;
  line-height: 1.4;
  background-color: rgba(24, 24, 24);
`;
const Content = styled.div`
  position: relative;

  width: 100%;
`;
const RelatedInfoContainer = styled.div`
  padding: 0 5rem;
  margin-bottom: 3.6rem;
`;
const PreviewPlayer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
  z-index: 1;
`;
const ActionsBox = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  bottom: 3vw;
  z-index: 2;
  padding: 0 5rem;

  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  button {
    transform: scale(2);
  }
`;

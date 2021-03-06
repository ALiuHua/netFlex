import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { getSeasons } from "../../helpers/browseHelper";
import Image from "next/image";
import { briefInfo } from "../billboard/BillboardHero";
// import { DetailButton, DetailIcon } from "../billboard/CardStyle";
import { DetailButton } from "../ui/Buttons";
const Episodes = ({ details }) => {
  console.log("Episode", details);
  const [seasonData, setSeasonData] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [showMore, setShowMore] = useState(false);
  useEffect(() => {
    const fetchSeasons = async () => {
      const seasons = await getSeasons(details?.id, selectedSeason);

      setSeasonData(seasons);
    };
    fetchSeasons();
  }, [details?.id, selectedSeason]);
  const episodeRef = useRef();
  const seasonSelectedHandler = (e) => {
    const selectedItem = details?.seasons.find(
      (data) => data.name === e.target.value
    );
    setSelectedSeason(selectedItem.season_number);
  };
  return (
    <EpisodesWrapper>
      <HeadInfo ref={episodeRef}>
        {console.log(selectedSeason)}
        {console.log(seasonData)}
        <span>Episodes</span>
        <Select onChange={seasonSelectedHandler}>
          {details.seasons.map((data, index) => (
            <option key={index} value={data.name}>
              {data.name}
            </option>
          ))}
        </Select>
      </HeadInfo>
      {seasonData &&
        seasonData.map((data, index) => {
          return (
            (showMore || index < 10) && (
              <EpisodeContent key={index}>
                <span>{data.episode_number}</span>
                <Poster>
                  <div>
                    <Image
                      src={`https://image.tmdb.org/t/p/w185${
                        data.still_path || details.backdrop_path
                      }`}
                      alt=""
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </Poster>
                <Description>
                  <div>
                    <SubTitle>{data.name}</SubTitle>
                    {data?.runtime !== 0 && data?.runtime && (
                      <Duration>{data.runtime}m</Duration>
                    )}
                  </div>
                  <p>
                    {briefInfo(data.overview, 20) ||
                      `No available content yet, will released at ${data.air_date}`}
                  </p>
                </Description>
              </EpisodeContent>
            )
          );
        })}
      {seasonData.length > 10 && (
        <ButtonWrapper showMore={showMore}>
          {/* <DetailButton
            onClick={() => {
              setShowMore((prev) => !prev);

              if (showMore)
                episodeRef.current.scrollIntoView({ behaviour: "smooth" });
            }}
          >
            <DetailIcon />
          </DetailButton> */}
          <DetailButton
            onClick={() => {
              setShowMore((prev) => !prev);

              if (showMore)
                episodeRef.current.scrollIntoView({ behaviour: "smooth" });
            }}
          />
        </ButtonWrapper>
      )}
    </EpisodesWrapper>
  );
};
//  number of seasons: details.number_of_seasons
//tv_id
// seasons: details.seasons
export default Episodes;
const EpisodesWrapper = styled.div`
  /* background-color: #141414; */
  & > div:nth-child(2) {
    background-color: rgb(36, 36, 36);
    border-radius: 6px;
    overflow: hidden;
  }
`;
const EpisodeContent = styled.div`
  display: flex;
  padding: 1.6rem;

  min-height: 8em; // have media-query condition
  border-bottom: 1px solid #404040;
  /* box-shadow: 0px 1px 1px rgb(36, 36, 36); */
  & > span {
    flex: 0 0 7%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5em;
  }
  & > div:nth-child(2) {
    flex: 0 0 23%;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      width: 100%;
      aspect-ratio: 16/9;
      border-radius: 6px;
      overflow: hidden;
      position: relative;
      /* img {
        display: block;
        width: 100%;
      } */
    }
  }
  & > div:nth-child(3) {
    flex: 0 0 70%;
    padding: 1.6rem;
  }
`;
const HeadInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 2.2rem;
  align-items: center;
  span {
    margin: 4.8rem 0 2rem 0;
  }
`;
const Select = styled.select`
  font-size: 2rem;
  background-color: rgb(36, 36, 36);
  color: rgb(255, 255, 255);
  margin: 4.8rem 0 2rem 0;
  padding: 8px 24px;
  border-radius: 4px;
  border: 1px solid #404040;
  option {
    background-color: rgb(36, 36, 36);
  }
`;
const Poster = styled.div``;
const Description = styled.div`
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.8rem;
  }
  p {
    font-size: 1.4rem;
    color: #d2d2d2;
  }
`;
const SubTitle = styled.span`
  font-size: 1em;
  font-weight: 700;
`;
const Duration = styled.span`
  font-size: 1em;
`;
export const ButtonWrapper = styled.div`
  position: relative;
  /* border-top: 2px solid #aaa; */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    border-top: 2px solid #555;
    z-index: 1;
  }

  button {
    position: absolute;
    left: 50%;
    transform: scale(1.5) translate(-50%, -50%) rotate(0deg);
    transform-origin: 0% 0%;
    color: #aaa;
    z-index: 2;
    ${({ showMore }) =>
      showMore &&
      css`
        transform: scale(1.5) translate(50%, 50%) rotate(180deg);
      `};
  }
`;

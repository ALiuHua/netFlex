import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { getSeasons } from "../../helpers/browseHelper";
const Episodes = ({ details }) => {
  console.log(details);
  const [seasonData, setSeasonData] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(1);
  useEffect(() => {
    const fetchSeasons = async () => {
      const seasons = await getSeasons(details?.id, selectedSeason);
      setSeasonData(seasons);
    };
    fetchSeasons();
  }, [details?.id, selectedSeason]);

  const seasonSelectedHandler = (e) => {
    const selectedItem = details?.seasons.find(
      (data) => data.name === e.target.value
    );
    setSelectedSeason(selectedItem.season_number);
  };
  return (
    <EpisodesWrapper>
      <HeadInfo>
        {console.log(selectedSeason)}
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
            <EpisodeContent key={index}>
              <span>{data.episode_number}</span>
              <Poster>
                <div>
                  <img
                    src={`https://image.tmdb.org/t/p/original${data.still_path}`}
                    alt=""
                  />
                </div>
              </Poster>
              <Description>
                <div>
                  <SubTitle>{data.name}</SubTitle>
                  <Duration>{data.runtime}m</Duration>
                </div>
                <p>{data.overview}</p>
              </Description>
            </EpisodeContent>
          );
        })}
    </EpisodesWrapper>
  );
};
//  number of seasons: details.number_of_seasons
//tv_id
// seasons: details.seasons
export default Episodes;
const EpisodesWrapper = styled.div`
  /* background-color: #141414; */
`;
const EpisodeContent = styled.div`
  display: flex;
  padding: 1.6rem;

  min-height: 8em; // have media-query condition
  border-top: 1px solid #404040;
  &:last-child {
    border-bottom: 1px solid #404040;
  }
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
      img {
        display: block;
        width: 100%;
      }
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
  background-color: transparent;
  color: rgb(255, 255, 255);
  margin: 4.8rem 0 2rem 0;
  padding: 8px 16px;
  option {
    background-color: rgb(24, 24, 24);
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

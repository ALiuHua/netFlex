import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { getRecommendation } from "../../helpers/browseHelper";
import Image from "next/image";
import { briefInfo } from "../billboard/BillboardHero";
const Recommendation = ({ category, details }) => {
  console.log("Episode", details);
  const [recommendData, setRecommendData] = useState(null);
  useEffect(() => {
    const fetchRecommendtion = async () => {
      const seasons = await getRecommendation(category, details?.id);
      setRecommendData(seasons);
    };
    fetchRecommendtion();
  }, [category, details?.id]);
  console.log(recommendData);
  //   const seasonSelectedHandler = (e) => {
  //     const selectedItem = details?.seasons.find(
  //       (data) => data.name === e.target.value
  //     );
  //     setSelectedSeason(selectedItem.season_number);
  //   };
  return (
    <RecommendationWrapper>
      <HeadInfo>
        <span>More like this</span>
      </HeadInfo>
      <Content>
        {recommendData &&
          recommendData.map((data, index) => {
            return (
              <EpisodeContent key={index}>
                <Poster>
                  <Image
                    src={`https://image.tmdb.org/t/p/w300${data.backdrop_path}`}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                  />
                </Poster>
                <Description>
                  <div>
                    <SubTitle>{data.name}</SubTitle>
                    <span>{new Date(data.first_air_date).getFullYear()}</span>
                  </div>
                  <p>
                    {briefInfo(data.overview, 25) ||
                      `No available content yet, will released at ${data.first_air_date}`}
                  </p>
                </Description>
              </EpisodeContent>
            );
          })}
      </Content>
    </RecommendationWrapper>
  );
};
/*0:
adult: false
     backdrop_path: "/Aq6rWq3yIytfaSad4qabTUl8n0J.jpg"
     first_air_date: "2019-02-01"
genre_ids: (2) [35, 18]
id: 84977
media_type: "tv"
      name: "Russian Doll"
origin_country: ['US']
original_language: "en"
       original_name: "Russian Doll"
       overview: "Nadia keeps dying and reliving her 36th birthday party. She's trapped in a surreal time loop -- and staring down the barrel of her own mortality."
popularity: 23.141
       poster_path: "/1ju4vQ1EwlIkQxEgWiYmxOs3iBG.jpg"
       vote_average: 7.5
vote_count: 439
*/
export default Recommendation;
const RecommendationWrapper = styled.div`
  /* background-color: #141414; */
  /* & > div:nth-child(2) { */
  /* background-color: rgb(36, 36, 36); */
  /* border-radius: 6px;
    overflow: hidden; */
  /* } */
`;
const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(21rem, 1fr));
  grid-gap: 12px;
  @media (max-width: 87.5em) {
    grid-template-columns: repeat(auto-fit, minmax(19rem, 1fr));
  }
  @media (min-width: 68.75em) {
  }
  @media (min-width: 50em) {
  }
`;
const EpisodeContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(36, 36, 36);
  min-height: 20em; // have media-query condition
  border-radius: 6px;
  overflow: hidden;

  /* border-bottom: 1px solid #404040; */
  /* box-shadow: 0px 1px 1px rgb(36, 36, 36); */
  & > span {
    flex: 0 0 7%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5em;
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
const Poster = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
`;
const Description = styled.div`
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  height: 20rem;
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

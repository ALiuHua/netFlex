import React from "react";
import styled from "styled-components";
import { briefInfo } from "../billboard/BillboardHero";
const Description = ({ category, details, cast }) => {
  console.log("Description");
  return (
    <DetailsWrapper>
      {details && (
        <>
          <DescriptionWrapper>
            <h1>{details?.original_name && details?.name}</h1>
            <div>
              {console.log(details)}
              <span>
                {new Date(
                  details.release_date ||
                    details.air_date ||
                    details.first_air_date
                ).getFullYear()}
              </span>
              <span>{details?.number_of_seasons} Seasons</span>
              <Rate rate={details?.vote_average}>
                Rate: {details?.vote_average}
              </Rate>
            </div>
            <p>{briefInfo(details?.overview, 30)}</p>
          </DescriptionWrapper>
          <SubInfo>
            <div>
              <span className="actors">Actors: </span>
              {cast?.cast.map((actor, index) => {
                if (index > 4) return;
                return index !== 4 ? (
                  <a key={index}>{actor?.name + ","}</a>
                ) : (
                  <a key={index}>{actor?.name}</a>
                );
              })}
            </div>
            <div>
              <span className="genre">Genres: </span>
              {details?.genres.map((data, index) => {
                return (
                  <a key={index}>
                    {index !== details?.genres.length - 1
                      ? data?.name + ","
                      : data?.name}
                  </a>
                );
              })}
              {/* not only can render node element in array, but also can render node element in nested array */}
            </div>
            {details?.tagline && (
              <div>
                <span className="tag">Tag: </span>
                <span>{details?.tagline}</span>
              </div>
            )}
          </SubInfo>
        </>
      )}
    </DetailsWrapper>
  );
};

export default Description;
const DetailsWrapper = styled.div`
  /* background-color: #141414; */
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
  column-gap: 20px;
  /* padding: 0 4.5rem; */
  min-height: 15rem;
`;
const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 16px; */
  h1 {
    font-size: 2.2rem;
    margin-bottom: 16px;
  }
  div {
    margin-bottom: 16px;
    span:not(:last-child) {
      margin-right: 15px;
    }
    span:last-child {
      padding: 2px 4px;
    }
  }
  p {
    margin-bottom: 16px;
    font-size: 1.6rem;
    margin-top: auto;
  }
`;
const SubInfo = styled.div`
  .actors,
  .genre,
  .tag {
    color: #777;
  }
  div:not(:last-child) {
    margin-bottom: 16px;
  }
  display: flex;
  flex-direction: column;
`;
const Rate = styled.span`
  background-color: ${({ rate, theme }) => rate > 8 && theme.accentColor};
  border-radius: 2px;
`;
/*
title:details.name / ~original_name
rate:details.vote_average
seasons: details.number_of_seasons
overview:~.overview


*/

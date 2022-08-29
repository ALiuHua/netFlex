import React from "react";
import {
  DetailsWrapper,
  DescriptionWrapper,
  SubInfo,
  Rate,
} from "./DetailsStyles";
import { briefInfo } from "../billboard/BillboardHero";
const Description = ({ details, cast }) => {
  return (
    <DetailsWrapper>
      {details && (
        <>
          <DescriptionWrapper>
            <h1>
              {details?.original_name ||
                details?.name ||
                details?.original_title}
            </h1>
            <div>
              <span>
                {new Date(
                  details.release_date ||
                    details.air_date ||
                    details.first_air_date
                ).getFullYear()}
              </span>
              <span>{details?.number_of_seasons} Seasons</span>
              <Rate rate={details?.vote_average}>
                Rate: {details?.vote_average.toFixed(1)}
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

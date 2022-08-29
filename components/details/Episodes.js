import React, { useState, useEffect, useRef } from "react";
import {
  EpisodesWrapper,
  EpisodeContent,
  HeadInfo,
  Select,
  EpisodeDescription,
  SubTitle,
  Duration,
  ButtonWrapper,
} from "./DetailsStyles";
import { getSeasons } from "../../helpers/browseHelper";
import Image from "next/image";
import { briefInfo } from "../billboard/BillboardHero";
import { DetailButton } from "../ui/Buttons";
const Episodes = ({ details }) => {
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
                <div>
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
                </div>

                <EpisodeDescription>
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
                </EpisodeDescription>
              </EpisodeContent>
            )
          );
        })}
      {seasonData.length > 10 && (
        <ButtonWrapper showMore={showMore}>
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
export default Episodes;

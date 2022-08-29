import React, { useState, useEffect, useRef } from "react";
import {
  RecommendationWrapper,
  RecommendationContent,
  RecommendationCard,
  HeadInfo,
  Poster,
  RecommondationDescription,
  SubTitle,
} from "./DetailsStyles";
import { getRecommendation } from "../../helpers/browseHelper";
import Image from "next/image";
import { briefInfo } from "../billboard/BillboardHero";
import { DetailButton } from "../ui/Buttons";
import { ButtonWrapper } from "./DetailsStyles";
const Recommendation = ({ itemCategory, details }) => {
  const [recommendData, setRecommendData] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const RecommondRef = useRef();
  useEffect(() => {
    const fetchRecommendtion = async () => {
      const seasons = await getRecommendation(itemCategory, details?.id);
      if (seasons) setRecommendData(seasons);
    };
    fetchRecommendtion();
  }, [itemCategory, details?.id]);

  return (
    <>
      {recommendData.length !== 0 && (
        <RecommendationWrapper>
          <HeadInfo ref={RecommondRef}>
            <span>More like this</span>
          </HeadInfo>
          <RecommendationContent>
            {recommendData.map((data, index) => {
              return (
                (showMore || index < 12) && (
                  <RecommendationCard key={index}>
                    <Poster>
                      <Image
                        src={`https://image.tmdb.org/t/p/${
                          data.backdrop_path
                            ? `w300${data.backdrop_path}`
                            : `w342${data.poster_path}`
                        }`}
                        alt=""
                        layout="fill"
                        objectFit="cover"
                      />
                    </Poster>
                    <RecommondationDescription>
                      <div>
                        <SubTitle>{data.title || data.name}</SubTitle>
                        <span>
                          {new Date(
                            data.first_air_date || data.release_date
                          ).getFullYear() || ""}
                        </span>
                      </div>
                      <p>
                        {briefInfo(data.overview, 25) ||
                          `No available content yet. ${
                            (data.first_air_date || data.release_date) &&
                            `This will be released at ${
                              data.first_air_date || data.release_date
                            }`
                          }`}
                      </p>
                    </RecommondationDescription>
                  </RecommendationCard>
                )
              );
            })}
          </RecommendationContent>
          {recommendData.length > 12 && (
            <ButtonWrapper showMore={showMore}>
              <DetailButton
                onClick={() => {
                  setShowMore((prev) => !prev);
                  if (showMore)
                    RecommondRef.current.scrollIntoView({
                      behaviour: "smooth",
                    });
                }}
              />
            </ButtonWrapper>
          )}
        </RecommendationWrapper>
      )}
    </>
  );
};
export default Recommendation;

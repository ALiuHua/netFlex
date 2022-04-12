import React from "react";
import { FeatureCard } from "../UI/FeatureCard";
import { featureContent } from "../UI/featureContent";
const FeatureSection = () => {
  return (
    <>
      {featureContent.map((data) => (
        <FeatureCard {...data} />
      ))}
    </>
  );
};

export default FeatureSection;

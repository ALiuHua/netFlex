import React from "react";
import { FeatureSection } from "./FeatureSection";
import { featureContent } from "./featureContent";
const Feature = () => {
  return (
    <>
      {featureContent.map((data) => (
        <FeatureSection key={data.id} {...data} />
      ))}
    </>
  );
};

export default Feature;

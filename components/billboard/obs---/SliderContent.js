import React from "react";
import Slider from "../Slider";
import Card from "../Card";
const SliderContent = ({ item }) => {
  return (
    <Slider item={item}>
      {item.map((data, index) => (
        <Card key={index} item={data} />
      ))}
    </Slider>
  );
};

export default SliderContent;

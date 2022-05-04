import React, { useState } from "react";
import styled from "styled-components";
import LolomoSlider from "./LolomoSlider";
const content = ["1", "2", "3", "4", "5", "6", "7"];
const lolomo = () => {
  const [itemHovered, setItemHovered] = useState(null);
  const mouseHandler = (index) => {
    setItemHovered(index);
  };
  console.log(itemHovered);
  const mouseLeaveHandler = (index) => {
    setItemHovered(null);
  };
  return (
    <LolomoSlider>
      {content.map((data, index) => (
        <div
          key={index}
          onMouseLeave={mouseLeaveHandler.bind(null, index)}
          onMouseOver={mouseHandler.bind(null, index)}
        >
          {index !== itemHovered && (
            <div>
              <p>{data}</p>
            </div>
          )}
          {console.log("re-render")}
          {index === itemHovered && (
            <DivRapper>
              <h2>{data + 1}</h2>
            </DivRapper>
          )}
        </div>
      ))}
    </LolomoSlider>
  );
};

export default lolomo;
const DivRapper = styled.div`
  position: absolute;
  bottom: 0;
  top: 0;
  background-color: green;
  animation: scaling 1s;
  @keyframes scaling {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.3);
    }
  }
`;

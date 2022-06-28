import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getRow } from "../../helpers/browseHelper";
import Card from "./Card";
const Slider = ({ category, item, onShowMore }) => {
  const [contentItems, setContentItems] = useState([]);
  useEffect(() => {
    const fetchRow = async () => {
      const RowItems = await getRow(item);
      setContentItems(RowItems);
    };
    fetchRow();
  }, []);
  console.log("slider running");
  return (
    <LolomoSlider item={item}>
      {contentItems.map((data, index) => (
        // <CardContextProvider>
        <Card
          category={category}
          key={data.id}
          item={data}
          onShowMore={onShowMore}
        />
        // </CardContextProvider>
      ))}
    </LolomoSlider>
  );
};

export default Slider;
const LolomoSlider = styled.div`
  height: 120px;
  display: flex;
  padding: 50px 0;
`;

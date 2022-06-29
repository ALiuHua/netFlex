import React, { useState, useEffect } from "react";
import { getRow } from "../../helpers/browseHelper";
import LolomoSlider from "./LolomoSlider";
import Card from "./Card";
// eslint-disable-next-line react/display-name
const Slider =({ category, item, onShowMore }) => {
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

import React, { useState, useEffect } from "react";
import { getRow } from "../../helpers/browseHelper";
import LolomoSlider from "./LolomoSlider";
import Card from "./Card";
const Slider = ({ category, item, rowNumber, onShowMore }) => {
  const [contentItems, setContentItems] = useState([]);
  useEffect(() => {
    const fetchRow = async () => {
      const RowItems = await getRow(item);
      setContentItems(RowItems);
    };
    fetchRow();
  }, []);
  return (
    <LolomoSlider item={item}>
      {contentItems.map((data, index) => (
        <Card
          category={category}
          key={data.id}
          item={data}
          rowNumber={rowNumber}
          onShowMore={onShowMore}
        />
      ))}
    </LolomoSlider>
  );
};

export default Slider;

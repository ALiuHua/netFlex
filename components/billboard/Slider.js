import React, { useState, useEffect } from "react";
import { getRow } from "../../helpers/browseHelper";
import LolomoSlider from "./LolomoSlider";
import Card from "./Card";
// eslint-disable-next-line react/display-name
const Slider = ({ category, item, onShowMore }) => {
  const [contentItems, setContentItems] = useState([]);
  useEffect(() => {
    const fetchRow = async () => {
      const RowItems = await getRow(category, item);
      setContentItems(RowItems);
    };
    fetchRow();
  }, [category, item]);
  return (
    <LolomoSlider item={item}>
      {contentItems.map((data, index) => (
        <Card
          category={category}
          key={data.id}
          item={data}
          onShowMore={onShowMore}
        />
      ))}
    </LolomoSlider>
  );
};

export default Slider;

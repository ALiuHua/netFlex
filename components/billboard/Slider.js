import React, { useState, useEffect } from "react";
import { getRow } from "../../helpers/browseHelper";
import LolomoSlider from "./LolomoSlider";
import CardContextProvider from "../../store/cardContext";
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
  return (
    <LolomoSlider item={item}>
      {contentItems.map((data, index) => (
        <CardContextProvider>
          <Card
            category={category}
            key={data.id}
            item={data}
            onShowMore={onShowMore}
          />
        </CardContextProvider>
      ))}
    </LolomoSlider>
  );
};

export default Slider;

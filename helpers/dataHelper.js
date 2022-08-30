export const getItemGenre = (itemGenresArray, genreCtx, genreNum, category) => {
  const ItemGenre = itemGenresArray.map((id, index) => {
    if (index > genreNum - 1) return null;
    return genreCtx[category].find((genre) => genre.id === id);
  });
  return ItemGenre;
};
export const withinSliderRange = (itemNode) => {
  const isCardVisible =
    itemNode.closest(".slick-slide").getAttribute("aria-hidden") === "false";
  return isCardVisible;
};

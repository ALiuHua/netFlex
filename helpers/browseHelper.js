import tmdb from "../data/dynamic/tmdb";
import { TMDB } from "../data/dynamic/tmdbEndpoints";
export const chooseRandomBanner = (dataLength) => {
  return Math.trunc(Math.random() * dataLength);
};
export const getBanner = async (category) => {
  const { data: res } = await tmdb.get(
    TMDB[category].sections[1].endpoint.replace("_pageNumber", 1)
  );
  const { data: res2 } = await tmdb.get(
    TMDB[category].sections[1].endpoint.replace("_pageNumber", 2)
  );
  //   console.log(TMDB[category].sections[1].endpoint.replace("_pageNumber", 1));

  const { results: results1 } = res;
  const { results: results2 } = res2;
  const resultsPool = [...results1, ...results2];
  const filteredResults = resultsPool.filter(
    ({ original_language, original_name, original_title }) =>
      original_language === "en" &&
      // get rid of items that its video can't be played
      (original_name || original_title) !== "Mortal Kombat" &&
      (original_name || original_title) !== "The Walking Dead" &&
      (original_name || original_title) !== "Superman & Lois" &&
      (original_name || original_title) !== "Fear the Walking Dead" &&
      (original_name || original_title) !== "Master of None"
  );
  const banner = filteredResults[chooseRandomBanner(filteredResults.length)];
  return banner;
};
export const getRow = async (row) => {
  const { data } = await tmdb.get(
    row.endpoint.replace("&page=_pageNumber", "")
  );
  const { results: sliderItems } = data;
  const filteredSliderItems = sliderItems.filter(
    ({ backdrop_path, poster_path }) => backdrop_path && poster_path
    // original_language === "en" && backdrop_path && poster_path
  );
  return filteredSliderItems;
};

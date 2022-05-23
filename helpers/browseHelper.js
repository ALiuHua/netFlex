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

export const getTrailer = async (category, itemId) => {
  //can be better we make name more geneic in tmdbEndpoint
  // const method =
  //   category === "TVShows" ? "fetchTVTrailers" : "fetchMovieTrailers";

  // const trailerEndPoint = TMDB[category].helpers[method].replace("_id", itemId);
  const trailerEndPoint = TMDB[category].helpers.fetchTrailers.replace(
    "_id",
    itemId
  );
  let trailer = null;
  const res = await tmdb.get(trailerEndPoint);
  // const {
  //   data: { results },
  // } = await tmdb.get(trailerEndPoint);
  console.log(res, res.status);
  const {
    data: { results },
  } = res;
  if (results.length > 0) {
    const trailerDetail = results
      .reverse()
      .find(
        ({ site, type }) =>
          site === "YouTube" &&
          (type === "Teaser" ||
            type === "Trailer" ||
            type === "Featurette" ||
            type === "Clip" ||
            type === "Opening Credits")
      );
    if (trailerDetail) {
      trailer = trailerDetail.key;
    }
  } else {
    throw new Error("no trailer result"); // 如果没有获取到trailer， throw an error
  }
  return trailer;
};
export const getGenres = async (category) => {
  const {
    data: { genres },
  } = await tmdb.get(TMDB[category].helpers.fetchGenres);

  return genres;
};
// this return a list which should be available initially.
// can be get at build stage. at get static props.
export const getCardDetails = async (category, item) => {
  // genery  trailer

  const { data: details } = await tmdb.get(
    TMDB[category].helpers.fetchDetails.replace("_id", item.id)
  );
  const { data: castData } = await tmdb.get(
    TMDB[category].helpers.fetchCredits.replace("_id", item.id)
  );
  const { cast } = castData;
  const { data: trailer } = await tmdb.get(
    TMDB[category].helpers.fetchTrailers.replace("_id", item.id)
  );

  return { details, castData, trailer };
};

export const isNewRelease = (item) => {
  const releaseDate = new Date(item?.release_date || item?.first_air_date);
  const currentDate = new Date();
  const gap = currentDate.getTime() - releaseDate.getTime();
  return Math.ceil(gap / (1000 * 3600 * 24)) <= 100;
};

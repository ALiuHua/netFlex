import React, { useEffect } from "react";
import { getTrailer } from "../helpers/browseHelper";
const Test = () => {
  // useEffect(() => {
  //   const fetchSeasonsInfo = async () => {
  //     const result = await getTrailer("movies", 507086);
  //     console.log(result);
  //   };

  //   fetchSeasonsInfo();
  // }, []);
  const item = {
    adult: false,
    backdrop_path: "/gG9fTyDL03fiKnOpf2tr01sncnt.jpg",
    category: "movies",
    genre_ids: (3)[(28, 878, 14)],
    id: 526894,
    original_language: "en",
    original_title: "Morbius",
    overview:
      "Dangerously ill with a rare blood disorder, and determined to save others suffering his same fate, Dr. Michael Morbius attempts a desperate gamble. What at first appears to be a radical success soon reveals itself to be a remedy potentially worse than the disease.",
    popularity: 1346.417,
    poster_path: "/6JjfSchsU6daXk2AKX8EEBjO3Fm.jpg",
    release_date: "2022-03-31",
    title: "Morbius",
    video: false,
    vote_average: 6.4,
    vote_count: 2068,
  };
  const submitHandler = async () => {
    console.log("handlerRunning");
    const response = await fetch("/api/auth/addToList", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(response, data);
  };
  const getHandler = async () => {
    const res = await fetch("/api/auth/addToList", { method: "GET" });
    const { list } = await res.json();
    console.log(list);
  };
  return (
    <>
      <div onClick={submitHandler}>T</div>
      <br></br>
      <p onClick={getHandler}>list</p>
    </>
  );
};

export default Test;
507086;
//this is tv_id   130652 "77680" 1418
//num  1

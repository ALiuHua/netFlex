import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { CirclePlayButton, DetailButton } from "../ui/Buttons";
// import { PlayIcon, DetailIcon } from "../ui/ButtonIcons";
import { ListButton } from "../ui/Buttons";
import { GenreTag, ActionWrapper } from "./CardStyle";
import { withinSliderRange, getItemGenre } from "../../helpers/dataHelper";
const CardDetail = ({ onPlay, onMoreInfo, item, onUpdateList }) => {
  const currentUser = useSelector((state) => state.users.email);
  const currentProfile = useSelector((state) => state.users.selectedProfile);
  const genreCtx = useSelector((state) => state.genre.genres);
  const [isInMyList, setIsInMyList] = useState(false);
  const [listIconState, setListIconState] = useState(false);
  console.log(Boolean(onUpdateList), listIconState);
  useEffect(() => {
    const checkListInfo = async () => {
      const response = await fetch(
        `/api/auth/addToList?itemId=${item.id}&user=${currentUser}&profileName=${currentProfile.profileName}`
      );
      const data = await response.json();
      console.log(data);
      console.log(data.isInMylist);
      if (data.isInMylist) {
        setIsInMyList(true);
      }
      setListIconState(true);
      console.log("======running");
    };
    checkListInfo();
  }, [item.id, currentUser, currentProfile.profileName]);
  console.log(isInMyList);
  // const [isListed, setIsListed] = useState(false);
  const addToListHandler = async () => {
    console.log("handlerRunning");
    const response = await fetch("/api/auth/addToList", {
      method: "POST",
      body: JSON.stringify({
        data: item,
        // action: "add",
        action: isInMyList ? "remove" : "add",
        // user: JSON.parse(localStorage.getItem("netflex")).email,
        // profileName: JSON.parse(localStorage.getItem("netflex")).profile
        //   .profileName,
        user: currentUser,
        profileName: currentProfile.profileName,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    console.log(response, data);
    if (response.ok) setIsInMyList((prev) => !prev);
  };
  return (
    <>
      <ActionWrapper>
        <CirclePlayButton
          onClick={() => {
            console.log("media play");
            onPlay();
          }}
        />
        {listIconState && (
          <ListButton
            isChecked={isInMyList}
            onClick={(e) => {
              addToListHandler();
              console.log(onUpdateList);
              if (!!onUpdateList) onUpdateList(item.id);
              e.stopPropagation();
            }}
          />
        )}
        <DetailButton
          onClick={() => {
            console.log("media info");
            onMoreInfo();
          }}
        />
      </ActionWrapper>

      <GenreTag>
        {getItemGenre(item?.genre_ids, genreCtx, 3, item.category).map(
          (data, i) => {
            return (
              data && (
                <React.Fragment key={i}>
                  {i !== 0 && <span className="dot">&bull;</span>}
                  <span className="genreName">{data?.name.split("&")[0]}</span>
                </React.Fragment>
              )
            );
          }
        )}
      </GenreTag>
    </>
  );
};

export default CardDetail;

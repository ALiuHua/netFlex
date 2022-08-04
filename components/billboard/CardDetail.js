import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { CirclePlayButton, DetailButton } from "../ui/Buttons";
import { ListButton } from "../ui/Buttons";
import { GenreTag, ActionWrapper } from "./CardStyle";
import { getItemGenre } from "../../helpers/dataHelper";
import useList from "../hooks/useList";
// import { setRequestMeta } from "next/dist/server/request-meta";
// import { ServerHeartbeatStartedEvent } from "mongodb";

// this is normally run in back-end if we import this accidently, we will get can error like Module not found: Can't resolve 'dns'
const CardDetail = ({ onPlay, onMoreInfo, item, onUpdateList }) => {
  const genreCtx = useSelector((state) => state.genre.genres);
  const currentUser = useSelector((state) => state.users.email);
  const currentProfile = useSelector((state) => state.users.selectedProfile);
  const { isInMyList, setIsInMyList, listIconState, addToListHandler } =
    useList(item, currentUser, currentProfile.profileName);
  // useEffect(() => {
  //
  // }, [isInMyList]);
  return (
    <>
      <ActionWrapper>
        <CirclePlayButton
          onClick={() => {
            onPlay();
          }}
        />
        {listIconState && (
          <ListButton
            isChecked={isInMyList}
            onClick={async (e) => {
              e.stopPropagation();
              const data = await addToListHandler(item);
              if (data.ok) {
                console.log("updatw mongolist");
                setIsInMyList((prev) => !prev);
              }
              if (!!onUpdateList) onUpdateList(item.id);
            }}
          />
        )}
        <DetailButton
          onClick={() => {
            onMoreInfo();
          }}
        />
      </ActionWrapper>

      <GenreTag>
        {getItemGenre(
          item?.genre_ids || item?.genres.map((genre) => genre.id),
          genreCtx,
          3,
          item.category
        ).map((data, i) => {
          return (
            data && (
              <React.Fragment key={i}>
                {i !== 0 && <span className="dot">&bull;</span>}
                <span className="genreName">{data?.name.split("&")[0]}</span>
              </React.Fragment>
            )
          );
        })}
      </GenreTag>
    </>
  );
};

export default CardDetail;

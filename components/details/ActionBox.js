import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ButtonBox } from "../billboard/BillboardHeroStyle";
import { CirclePlayButton, ListButton } from "../ui/Buttons";
import EmbedButtonBox from "../ui/Buttons";
import { useSelector } from "react-redux";
import useList from "../hooks/useList";
const ActionBox = ({ item, itemCategory }) => {
  const currentUser = useSelector((state) => state.users.email);
  const currentProfile = useSelector((state) => state.users.selectedProfile);
  const { isInMyList, setIsInMyList, listIconState, addToListHandler } =
    useList(item, currentUser, currentProfile.profileName);
  return (
    <ActionsBox>
      <ButtonBox scaled={1.7}>
        <CirclePlayButton
          onClick={() => {
            console.log("play clicked");
            // playHandler();
            // don‘t need this with 事件委托
          }}
        />
      </ButtonBox>
      <ButtonBox scaled={1.7}>
        {listIconState && (
          <ListButton
            isChecked={isInMyList}
            onClick={async (e) => {
              e.stopPropagation();
              const data = await addToListHandler(item, itemCategory);
              // console.log(onUpdateList);
              // if (!!onUpdateList) onUpdateList(item.id);
              if (data.ok) {
                console.log("mongolist");
                setIsInMyList((prev) => !prev);
              }
            }}
          />
        )}
      </ButtonBox>
      <EmbedButtonBox showMuteToggling={true} scaled={0.85} />
    </ActionsBox>
  );
};

export default ActionBox;

const ActionsBox = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  bottom: 3vw;
  z-index: 2;
  padding: 0 5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  & > div:nth-child(2) {
    margin-left: 2rem;
    margin-right: auto;
  }
  /* button {
    transform: scale(2);
  } */
`;

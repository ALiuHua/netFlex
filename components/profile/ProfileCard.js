import React from "react";
import Image from "next/image";
import styled from "styled-components";

const ProfileCard = ({ avatarSrc, avatarName, width, height, onClick }) => {
  console.log(avatarName);
  return (
    <CardWrapper onClick={onClick}>
      <AvatarWrapper>
        <Image src={avatarSrc} width={width} height={height} />
      </AvatarWrapper>
      <ProfileName>{avatarName}</ProfileName>
    </CardWrapper>
  );
};

export default ProfileCard;
export const CardWrapper = styled.div`
  padding: 0 1rem;
  cursor: pointer;
`;
export const AvatarWrapper = styled.div`
  width: 200px;
  height: 200px;
`;
export const ProfileName = styled.span`
  padding: 3px 0;
  display: block;
`;

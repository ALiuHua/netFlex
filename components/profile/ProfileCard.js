import React from "react";
import Image from "next/image";
import styled from "styled-components";

const ProfileCard = ({
  isManaging,
  avatarSrc,
  avatarId,
  profileId,
  width,
  height,
  onClick,
}) => {
  console.log(avatarId);
  return (
    <CardWrapper onClick={onClick}>
      <AvatarWrapper>
        <Image src={avatarSrc} width={width} height={height} />
        {isManaging && <EditOverlay />}
      </AvatarWrapper>
      <ProfileName>{profileId}</ProfileName>
    </CardWrapper>
  );
};

export default ProfileCard;
export const CardWrapper = styled.div`
  /* padding: 0 1rem; */
  position: relative;
  cursor: pointer;
  font-size: 1.6rem;
  font-weight: 400;
  color: #aaa;
  div::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid #fff;
    display: none;
  }
  /* div {
    border: 2px solid transparent;
    // 解决border出现时的flicking问题，也可以通过伪元素来实现，如netflix
  } */
  &:hover div::after {
    color: #eee;
    display: block;
    /* div::after {
      border: 2px solid #eee;
    } */
  }
`;
export const AvatarWrapper = styled.div`
  /* width: 12rem;
  height: 12rem; */
  width: 10vw;
  height: 10vw;
  min-height: 84px;
  max-height: 135px;
  min-width: 84px;
  max-width: 135px;
  border-radius: 3px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
`;
export const ProfileName = styled.span`
  padding: 12px 0;
  display: block;
  line-height: 1.6;
  font-size: 16px;
`;
export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  svg {
    color: #fff;
    width: 25%;
    height: 25%;
  }
`;
export const EditOverlay = () => {
  return (
    <Overlay>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        // class="svg-icon svg-icon-edit"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22.2071 7.79285L15.2071 0.792847L13.7929 2.20706L20.7929 9.20706L22.2071 7.79285ZM13.2071 3.79285C12.8166 3.40232 12.1834 3.40232 11.7929 3.79285L2.29289 13.2928C2.10536 13.4804 2 13.7347 2 14V20C2 20.5522 2.44772 21 3 21H9C9.26522 21 9.51957 20.8946 9.70711 20.7071L19.2071 11.2071C19.5976 10.8165 19.5976 10.1834 19.2071 9.79285L13.2071 3.79285ZM17.0858 10.5L8.58579 19H4V14.4142L12.5 5.91417L17.0858 10.5Z"
          fill="currentColor"
        ></path>
      </svg>
    </Overlay>
  );
};

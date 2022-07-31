import React from "react";
import styled, { keyframes } from "styled-components";
import Image from "next/image";
import { Profiler } from "react";
const LoadingOverlay = ({ profileSrc }) => {
  return (
    <LoadingOverlayWrapper>
      <CenterWrappper>
        <SpinnerWrapper>
          <Image src={"/images/misc/spinner.png"} width={150} height={150} />
        </SpinnerWrapper>
        <ProfilerWrapper>
          {profileSrc && <Image src={profileSrc} width={100} height={100} />}
        </ProfilerWrapper>
      </CenterWrappper>
    </LoadingOverlayWrapper>
  );
};
export default LoadingOverlay;

const LoadingOverlayWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0%;
  width: 100%;
  height: 100vh;
  background-color: #000;
  z-index: 100;
`;
const CenterWrappper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const SpinnerWrapper = styled.div`
  width: 150px;
  height: 150px;
  position: relative;
  animation: loadingAnimation 1s linear infinite;
  @keyframes loadingAnimation {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
const ProfilerWrapper = styled.div`
  width: 80px;
  height: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 2px;
  overflow: hidden;
`;

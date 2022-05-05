import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { getBanner } from "../../helpers/browseHelper";
const BillboardHero = () => {
  const [banner, setBanner] = useState(null);
  useEffect(() => {
    const fetchBillboard = async () => {
      const bannerData = await getBanner("movies");
      setBanner(bannerData);
      // why show twice consolse????
    };
    fetchBillboard();
  }, []);
  return (
    <BillboardWrapper>
      <BillboardContent>
        <BillboardBackground banner={banner}>
          <GradientLayer />
        </BillboardBackground>
      </BillboardContent>
      <BillboardDetail>
        <DescriptionContainer>
          {banner && (
            <Description>
              {banner?.name}
              <br />
              {banner.overview}
            </Description>
          )}
          {/* 这里我们刷新时并没有出现banner大小位置晃动的现象，这是因为
          banner div的大小并不是由其内容决定的，而是通过padding设置的固定大小。advantage1
          
          这里我们用父div代表其真实大小，然后里面的子div设置为背景大小，然后利用负margin来调整到header位置。当
          子元素的负margin也回导致父元素上升，但这个子元素必须是第一个子元素*/}
          <ActionBox>Action box</ActionBox>
        </DescriptionContainer>
        <ButtonBox>Button Box</ButtonBox>
      </BillboardDetail>
    </BillboardWrapper>
  );
};

export default BillboardHero;
export const BillboardWrapper = styled.div`
  position: relative;
  margin-top: -100px;
  padding-bottom: 40%;
  margin-bottom: 20px;
  z-index: -1;
  /* background-color: orangered; */
`;
export const BillboardContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 56.25vw;
`;
export const BillboardBackground = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  ${({ banner }) => css`
    background: linear-gradient(
        77deg,
        rgba(0, 0, 0, 0.6) 0,
        rgba(0, 0, 0, 0) 85%
      ),
      url(https://image.tmdb.org/t/p/original${banner?.backdrop_path});
  `};
  background-position: center;
  background-size: cover;
`;
export const GradientLayer = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 14.7vw;
  background-image: linear-gradient(
    to bottom,
    rgba(20, 20, 20, 0) 0,
    rgba(20, 20, 20, 0.15) 15%,
    rgba(20, 20, 20, 0.35) 29%,
    rgba(20, 20, 20, 0.58) 44%,
    #141414 68%,
    #141414 100%
  );
  opacity: 1;
`;
export const BillboardDetail = styled.div`
  position: absolute;
  top: 50%;
  /* background-color: orangered; */
  transform: translateY(-50%);
  /* bottom: 0; */

  /* right: 0; */
  width: 100%;
  height: 55%;
  padding: 0 45px;

  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
export const DescriptionContainer = styled.div`
  width: 36%;
  height: 100%;
  /* background-color: green; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const Description = styled.div`
  /* width: 36%;
  height: 100%;
  background-color: green; */
`;
export const ActionBox = styled.div``;
export const ButtonBox = styled.div``;

import styled, { css } from "styled-components";
export const MediaInfo = styled.div`
  width: 100%;
  background-color: rgba(35, 35, 35);
  opacity: 0;
  transition: all 0.1s ease-in;
  font-size: 1rem;
  cursor: pointer;
  * {
    display: none;
  }
`;
export const MiniTile = styled.h3`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 1rem;
  display: inline-block !important;
  position: absolute;
  left: 5%;
  bottom: 8%;
  color: #eee;
  z-index: 1;
`;
export const IsNew = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e30613;
  width: 26px;
  font-size: 1rem;
  padding: 6px 8px;
  margin-bottom: 0.6rem;
  /* border-radius: 2px; */
  top: 0;
  right: 0;
  z-index: 1;
  position: absolute;
`;
export const GenreTag = styled.div`
  display: flex !important;
  align-items: center;
  .dot {
    color: rgba(245, 245, 245, 0.5);
    font-size: 1rem;
    padding: 0 6px;
  }
`;

export const MediaContent = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 4px;
  overflow: hidden;
  background-color: #141414;
  cursor: pointer;
`;
export const ImgWrapper = styled.div`
  position: relative;
  z-index: 3;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    /* object-fit: cover; // causing shaking   why?? */
    display: block;
  }
`;

export const CardWrapper = styled.div`
  position: relative;
  /* box-shadow: rgb(0 0 0 / 75%) 0px 3px 10px; */
  aspect-ratio: 16/9;

  box-shadow: 2px 2px 1rem rgba(20, 20, 20, 0.85);
  transform-origin: ${({ location }) =>
    location === "left"
      ? "0% 85%"
      : location === "right"
      ? "100% 85%"
      : "50% 85%"};
  transition: all 0.3s ease-in;
  &:hover {
    transform: scale(1.5);
    /* transition: all 0.3s ease-in; */
    transition-delay: 0.5s; // this will only effect with hover state instead of both hover and unhover
  }

  &:hover .mediaContent {
    /* transition-delay: 0.5s; //??? */
    border-radius: 4px 4px 0 0;
  }
  &:hover .mediaInfo {
    opacity: 1;
    height: 70px;
    transition: opacity 0.3s ease-in;
    transition-delay: 0.5s;
    padding: 6px 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border-radius: 0 0 4px 4px;

    * {
      display: block;
    }
  }
`;
export const ActionWrapper = styled.div`
  width: 100%;
  display: flex !important;
  justify-content: space-between !important;
`;
export const DetailIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      //   class="Hawkins-Icon Hawkins-Icon-Standard"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.293 7.29297L12.0001 14.5859L4.70718 7.29297L3.29297 8.70718L11.293 16.7072C11.4805 16.8947 11.7349 17.0001 12.0001 17.0001C12.2653 17.0001 12.5196 16.8947 12.7072 16.7072L20.7072 8.70718L19.293 7.29297Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};
export const DetailButton = styled.button`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  border: 1px solid currentColor;
  cursor: pointer;
  transition: background-color 0.2s;
  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  /* transform: scale(0.35); */
  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
    padding: 0.2rem;
    display: inline-block;
  }
`;
export const GradientLayer = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.2) 0,
    rgba(0, 0, 0, 0.1) 60%,
    rgba(0, 0, 0, 0.1) 100%
  );
  /* opacity: 0.65; */
`;
/*
//  +
<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  class="Hawkins-Icon Hawkins-Icon-Standard"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M10.696 8.7732C10.8947 8.45534 11 8.08804 11 7.7132V4H11.8377C12.7152 4 13.4285 4.55292 13.6073 5.31126C13.8233 6.22758 14 7.22716 14 8C14 8.58478 13.8976 9.1919 13.7536 9.75039L13.4315 11H14.7219H17.5C18.3284 11 19 11.6716 19 12.5C19 12.5929 18.9917 12.6831 18.976 12.7699L18.8955 13.2149L19.1764 13.5692C19.3794 13.8252 19.5 14.1471 19.5 14.5C19.5 14.8529 19.3794 15.1748 19.1764 15.4308L18.8955 15.7851L18.976 16.2301C18.9917 16.317 19 16.4071 19 16.5C19 16.9901 18.766 17.4253 18.3994 17.7006L18 18.0006L18 18.5001C17.9999 19.3285 17.3284 20 16.5 20H14H13H12.6228C11.6554 20 10.6944 19.844 9.77673 19.5382L8.28366 19.0405C7.22457 18.6874 6.11617 18.5051 5 18.5001V13.7543L7.03558 13.1727C7.74927 12.9688 8.36203 12.5076 8.75542 11.8781L10.696 8.7732ZM10.5 2C9.67157 2 9 2.67157 9 3.5V7.7132L7.05942 10.8181C6.92829 11.0279 6.72404 11.1817 6.48614 11.2497L4.45056 11.8313C3.59195 12.0766 3 12.8613 3 13.7543V18.5468C3 19.6255 3.87447 20.5 4.95319 20.5C5.87021 20.5 6.78124 20.6478 7.65121 20.9378L9.14427 21.4355C10.2659 21.8094 11.4405 22 12.6228 22H13H14H16.5C18.2692 22 19.7319 20.6873 19.967 18.9827C20.6039 18.3496 21 17.4709 21 16.5C21 16.4369 20.9983 16.3742 20.995 16.3118C21.3153 15.783 21.5 15.1622 21.5 14.5C21.5 13.8378 21.3153 13.217 20.995 12.6883C20.9983 12.6258 21 12.5631 21 12.5C21 10.567 19.433 9 17.5 9H15.9338C15.9752 8.6755 16 8.33974 16 8C16 6.98865 15.7788 5.80611 15.5539 4.85235C15.1401 3.09702 13.5428 2 11.8377 2H10.5Z"
    fill="currentColor"
  ></path>
</svg>;
// sumb up
<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  class="Hawkins-Icon Hawkins-Icon-Standard"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M10.696 8.7732C10.8947 8.45534 11 8.08804 11 7.7132V4H11.8377C12.7152 4 13.4285 4.55292 13.6073 5.31126C13.8233 6.22758 14 7.22716 14 8C14 8.58478 13.8976 9.1919 13.7536 9.75039L13.4315 11H14.7219H17.5C18.3284 11 19 11.6716 19 12.5C19 12.5929 18.9917 12.6831 18.976 12.7699L18.8955 13.2149L19.1764 13.5692C19.3794 13.8252 19.5 14.1471 19.5 14.5C19.5 14.8529 19.3794 15.1748 19.1764 15.4308L18.8955 15.7851L18.976 16.2301C18.9917 16.317 19 16.4071 19 16.5C19 16.9901 18.766 17.4253 18.3994 17.7006L18 18.0006L18 18.5001C17.9999 19.3285 17.3284 20 16.5 20H14H13H12.6228C11.6554 20 10.6944 19.844 9.77673 19.5382L8.28366 19.0405C7.22457 18.6874 6.11617 18.5051 5 18.5001V13.7543L7.03558 13.1727C7.74927 12.9688 8.36203 12.5076 8.75542 11.8781L10.696 8.7732ZM10.5 2C9.67157 2 9 2.67157 9 3.5V7.7132L7.05942 10.8181C6.92829 11.0279 6.72404 11.1817 6.48614 11.2497L4.45056 11.8313C3.59195 12.0766 3 12.8613 3 13.7543V18.5468C3 19.6255 3.87447 20.5 4.95319 20.5C5.87021 20.5 6.78124 20.6478 7.65121 20.9378L9.14427 21.4355C10.2659 21.8094 11.4405 22 12.6228 22H13H14H16.5C18.2692 22 19.7319 20.6873 19.967 18.9827C20.6039 18.3496 21 17.4709 21 16.5C21 16.4369 20.9983 16.3742 20.995 16.3118C21.3153 15.783 21.5 15.1622 21.5 14.5C21.5 13.8378 21.3153 13.217 20.995 12.6883C20.9983 12.6258 21 12.5631 21 12.5C21 10.567 19.433 9 17.5 9H15.9338C15.9752 8.6755 16 8.33974 16 8C16 6.98865 15.7788 5.80611 15.5539 4.85235C15.1401 3.09702 13.5428 2 11.8377 2H10.5Z"
    fill="currentColor"
  ></path>
</svg>;
//sumb down
<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  class="Hawkins-Icon Hawkins-Icon-Standard"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M13.304 15.2268C13.1053 15.5447 13 15.912 13 16.2868V20H12.1623C11.2848 20 10.5715 19.4471 10.3927 18.6887C10.1767 17.7724 10 16.7728 10 16C10 15.4152 10.1024 14.8081 10.2464 14.2496L10.5685 13H9.27807H6.5C5.67157 13 5 12.3284 5 11.5C5 11.4071 5.00833 11.3169 5.02404 11.2301L5.10454 10.7851L4.82357 10.4308C4.6206 10.1748 4.5 9.85286 4.5 9.5C4.5 9.14714 4.6206 8.82521 4.82357 8.56924L5.10454 8.2149L5.02405 7.76991C5.00833 7.68305 5 7.59293 5 7.5C5 7.0099 5.23399 6.57474 5.60058 6.29938L5.99996 5.99939L6 5.49989C6.00006 4.67151 6.67161 4 7.5 4H10H11H11.3772C12.3446 4 13.3056 4.15595 14.2233 4.46185L15.7163 4.95954C16.7754 5.31257 17.8838 5.49494 19 5.4999V10.2457L16.9644 10.8273C16.2507 11.0312 15.638 11.4924 15.2446 12.1219L13.304 15.2268ZM13.5 22C14.3284 22 15 21.3284 15 20.5V16.2868L16.9406 13.1819C17.0717 12.9721 17.276 12.8183 17.5139 12.7503L19.5494 12.1687C20.408 11.9234 21 11.1387 21 10.2457V5.45319C21 4.37447 20.1255 3.5 19.0468 3.5C18.1298 3.5 17.2188 3.35216 16.3488 3.06217L14.8557 2.56448C13.7341 2.19061 12.5595 2 11.3772 2H11H10H7.5C5.73076 2 4.26812 3.31275 4.03301 5.01735C3.39612 5.65042 3 6.52905 3 7.5C3 7.56309 3.00168 7.62585 3.005 7.68825C2.6847 8.21698 2.5 8.83782 2.5 9.5C2.5 10.1622 2.6847 10.783 3.005 11.3117C3.00168 11.3742 3 11.4369 3 11.5C3 13.433 4.567 15 6.5 15H8.06624C8.02476 15.3245 8 15.6603 8 16C8 17.0114 8.22123 18.1939 8.44607 19.1476C8.85988 20.903 10.4572 22 12.1623 22H13.5Z"
    fill="currentColor"
  ></path>
</svg>;
*/

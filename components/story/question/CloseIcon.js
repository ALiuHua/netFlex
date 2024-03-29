import React from "react";
import styled from "styled-components";
const CloseIcon = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.1"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
};

export default CloseIcon;
export const StyledCloseIcon = styled(CloseIcon)`
  width: 36px;
  height: 36px;
  @media (max-width: 50em) {
    width: 26px;
    height: 26px;
  }
  ${({ qState }) => qState && "transform:rotate(45deg)"}
`;

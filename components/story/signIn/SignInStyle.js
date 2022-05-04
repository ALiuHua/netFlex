import styled from "styled-components";
export const SignInWrapper = styled.div`
  position: relative;
  z-index: 2;
  max-width: 45rem;
  background-color: transparent;
  min-height: 75vh;
  margin: 0 auto;
  // 负margin造成的元素意味可能会导致窗口拖动时元素重叠。
`;
export const SignInContent = styled.div`
  min-height: 660px;
  padding: 60px 68px 40px;
  /* margin-bottom: 90px; */
  background-color: rgba(0, 0, 0, 0.75);
`;

import styled, { css } from "styled-components";
export const AccordionWrapper = styled.div`
  &:not(:last-child) {
    margin-bottom: 6px;
  }
`;
export const AccordionHeader = styled.div`
  padding: 1.28rem 3.52rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2px;
  background-color: #303030;
  cursor: pointer;
  h3 {
    font-size: 2.6rem;
    font-weight: 400;
  }
`;
export const ContentWrapper = styled.div`
  padding: 1.28rem 3.52rem;
  font-size: 2.6rem;
  font-weight: 400;
  background-color: #303030;
  margin-bottom: 1px;
  transition: all 0.25s cubic-bezier(0.5, 0, 0.1, 1);
  /* display: ${({ qState }) => (qState ? "block" : "none")}; */
  ${({ qState }) =>
    !qState &&
    css`
      height: 0;
      padding: 0 3.52rem;
      overflow: hidden;
    `}
`;

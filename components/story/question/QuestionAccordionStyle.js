import styled, { css } from "styled-components";
export const AccordionWrapper = styled.div`
  &:not(:last-child) {
    margin-bottom: 6px;
  }
`;
export const AccordionHeader = styled.div`
  padding: 2.08rem 4%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2px;
  background-color: #303030;
  cursor: pointer;
  h3 {
    font-size: 2.6rem;
    font-weight: 400;
    @media only screen and (max-width: ${({ theme }) => theme.mediaMedium}) {
      font-size: 2rem;
    }
    @media only screen and (max-width: ${({ theme }) => theme.mediaSmall}) {
      font-size: 2.5rem;
    }
    @media only screen and (max-width: ${({ theme }) => theme.mediaXsmall}) {
      font-size: 2.25rem;
    }
  }
`;
export const ContentWrapper = styled.div`
  padding: 1.28rem 4%;
  font-size: 2.6rem;
  font-weight: 400;
  background-color: #303030;
  margin-bottom: 1px;
  transition: all 0.25s cubic-bezier(0.5, 0, 0.1, 1);
  ${({ qState }) =>
    !qState &&
    css`
      height: 0;
      padding: 0 3.52rem;
      overflow: hidden;
    `}

  p {
    font-size: 2.6rem;
    font-weight: 400;
    @media only screen and (max-width: ${({ theme }) => theme.mediaMedium}) {
      font-size: 2.5rem;
    }
    @media only screen and (max-width: ${({ theme }) => theme.mediaXsmall}) {
      font-size: 2.25rem;
    }
  }
`;

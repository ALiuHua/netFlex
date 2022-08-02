import styled, { css } from "styled-components";

export const BackgroundImage = styled.div`
  position: absolute;
  top: -110px;
  left: 0;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  overflow: hidden;
  z-index: 1;
  /* @media screen and (max-width: 50em) {
    display: none;
  } */
`;
export const GradientLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0,
    rgba(0, 0, 0, 0.5) 60%,
    rgba(0, 0, 0, 0.8) 100%
  );
`;
export const HeroSection = styled.section`
  position: relative;
  padding: 7rem 4.5rem;
  border-bottom: 0.8rem solid ${({ theme }) => theme.borderBottomColor};

  @media only screen and (max-width: ${({ theme }) => theme.mediaXsmall}) {
    padding: 6.25rem 5%;
  }
`;
export const HeroWrapper = styled.div`
  position: relative;
  max-width: 95rem;
  margin: 0 auto;
  padding: 7.5rem 0;
  text-align: center;
  z-index: 2;
  @media only screen and (max-width: ${({ theme }) => theme.mediaXsmall}) {
    padding: 3.75rem 0;
  }
`;
export const HeroText = styled.div`
  max-width: 95rem;
  margin: 0 auto;
  padding: 0 7.5rem;
  @media only screen and (max-width: ${({ theme }) => theme.mediaLarge}) {
    max-width: 64rem;
    padding: 0;
  }
  h1 {
    font-size: 6.4rem;
    @media only screen and (max-width: ${({ theme }) => theme.mediaLarge}) {
      font-size: 5rem;
    }
    @media only screen and (max-width: ${({ theme }) => theme.mediaXsmall}) {
      font-size: 3.5rem;
    }
  }
  h2 {
    font-size: 2.6rem;
    padding: 1.6rem 0;
    font-weight: 400;
    @media only screen and (max-width: ${({ theme }) => theme.mediaSmall}) {
      font-size: 3.25rem;
    }
    @media only screen and (max-width: ${({ theme }) => theme.mediaXsmall}) {
      font-size: 2.25rem;
    }
  }
`;

export const CTAForm = styled.form`
  max-width: 95rem;
  margin: 1.36rem auto 0 auto;

  text-align: center;
  @media only screen and (max-width: ${({ theme }) => theme.mediaXsmall}) {
    padding: 3.75rem 0;
  }
  h3 {
    margin: 0 auto;
    font-size: 1.92rem;
    padding: 0 5% 2rem 5%;
    font-weight: 400;
    @media only screen and (max-width: ${({ theme }) => theme.mediaMedium}) {
      font-size: 2.3rem;
      max-width: 45rem;
    }
    @media only screen and (max-width: ${({ theme }) => theme.mediaSmall}) {
      font-size: 2.25rem;
      max-width: 60rem;
      padding: 0 4.75rem 2rem 4.75rem;
    }
  }
`;
export const FormContent = styled.div`
  display: flex;
  justify-content: center;
  /* align-items: stretch; */
  @media only screen and (max-width: ${({ theme }) => theme.mediaMedium}) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`;
export const InputFiled = styled.div`
  width: 100%;
  max-width: 50rem;
  height: 7rem;
  position: relative;
  @media only screen and (max-width: ${({ theme }) => theme.mediaLarge}) {
    max-width: 45rem;
    height: 6rem;
  }
  @media only screen and (max-width: ${({ theme }) => theme.mediaMedium}) {
    max-width: 50rem;
    height: 6rem;
  }
  @media only screen and (max-width: ${({ theme }) => theme.mediaSmall}) {
    max-width: 62.5rem;
    height: 6rem;
  }

  label {
    position: absolute;
    color: #8c8c8c;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    font-size: 16px;
  }

  input:focus + label {
    top: 6px;
    left: 10px;
    font-size: 13px;
    transform: translateY(0);
    font-weight: 700;
  }
  /* bug   when it's not focused, the label will fall down;
  hotFlix solution: when input has value, we still need transition.
  */
  // still need to add transition and transform in small screen.
`;

export const Input = styled.input`
  width: 100%;
  height: 100%;
  border: 1px solid #8c8c8c;
  padding: 10px 10px 0 10px;
  outline: none;
  font-size: 1.6rem; /*this will decide what font size of input text */
  &:focus {
    border-color: #0071eb;
  }
  /* @media only screen and (max-width: ${({ theme }) => theme.mediaLarge}) {
    padding: 0;
  } */
  ${({ value }) =>
    value &&
    css`
      & + label {
        top: 6px;
        left: 10px;
        font-size: 13px;
        transform: translateY(0);
        font-weight: 700;
      }
    `}// styled props only works with styled component. even if inside of styled component won't 
    //work as well.
`;
export const FormButton = styled.button`
  /* background: none; */
  /* outline: none; */
  border-left: 0.1rem solid #333;
  background-color: ${({ theme }) => theme.accentColor};
  font-size: 3rem;
  /* height: 100%; */
  padding: 0 2.6rem;
  border-radius: 0 1px 1px 0;
  display: block;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.accentColorLight};
  }
  @media only screen and (max-width: ${({ theme }) => theme.mediaLarge}) {
    font-size: 2.6rem;
    border-radius: 1px;
  }
  @media only screen and (max-width: ${({ theme }) => theme.mediaMedium}) {
    font-size: 16px;
    padding: 5.6px 16px;
    height: 40px;
  }
`;
export const Error = styled.p`
  padding: 6px 3px;
  font-size: 1.3rem;
  color: #b92d2b;
  text-align: left;
`;

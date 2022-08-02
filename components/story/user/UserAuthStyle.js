import styled, { css } from "styled-components";
export const SignInWrapper = styled.div`
  position: relative;
  z-index: 2;
  max-width: 45rem;
  background-color: transparent;
  min-height: 75vh;
  margin: 0 auto;
  @media screen and (max-width: 30em) {
    width: 100%;
    max-width: 60rem;
    /* background-color: #141414; */
    /* min-height: 100%; */
  }

  // 负margin造成的元素意味可能会导致窗口拖动时元素重叠。
`;
export const SignInContent = styled.div`
  /* min-height: 660px; */
  padding: 60px 68px 40px;
  border-radius: 5px;
  /* margin-bottom: 90px; */
  background-color: rgba(0, 0, 0, 0.75);
  h2 {
    font-size: 3.4rem;
  }
  @media screen and (max-width: 30em) {
    /* background-color: #141414; */
    background-color: transparent;
    height: 100%;
    padding: 60px 4% 40px;
    font-size: 4.5rem;
  }
`;

export const Form = styled.form`
  margin-top: 4rem;
`;

export const InputFiled = styled.div`
  width: 100%;
  /* max-width: 50rem; */
  height: 5.5rem;
  position: relative;

  border-radius: 5px;
  overflow: hidden;
  &:not(:first-child) {
    margin-top: 2rem;
  }
  label {
    position: absolute;
    color: #8c8c8c;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
    font-size: 16px;
  }

  input:focus + label {
    top: 6px;
    left: 20px;
    font-size: 12px;
    transform: translateY(0);
    font-weight: 700;
  }
  /* bug   when it's not focused, the label will fall down;
  hotFlix solution: when input has value, we still need transition.
  */
  // still need to add transition and transform in small screen.
`;
export const Notification = styled.p`
  font-size: 1.3rem;
  color: #e87c03;
  padding: 6px 3px;
`;

export const Input = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  /* background: none; */
  color: #eee;
  background-color: #333;
  padding: 10px 10px 0 20px;
  outline: none;
  font-size: 1.6rem; /*this will decide what font size of input text */
  /* &:focus {
    border-color: #0071eb;
  } */
  /* @media only screen and (max-width: ${({ theme }) => theme.mediaLarge}) {
    padding: 0;
  } */
  border-bottom: 2px solid transparent;
  border-radius: 5px;
  ${({ errorBorder }) =>
    errorBorder &&
    css`
      border-bottom: 2px solid #e87c03;
    `}
  ${({ value }) =>
    value &&
    css`
      & + label {
        top: 6px;
        left: 20px;
        font-size: 12px;
        transform: translateY(0);
        font-weight: 700;
      }
    `} // styled props only works with styled component. even if inside of styled component won't 
    //work as well.
`;
export const FormButton = styled.button`
  position: relative;
  width: 100%;
  height: 4.8rem;
  background-color: ${({ theme }) => theme.accentColor};
  font-size: 1.8rem;
  padding: 0 2.6rem;
  font-weight: 700;
  border-radius: 5px;
  margin-top: 4rem;
  display: block;
  cursor: pointer;
  overflow: hidden;
  &:hover {
    background-color: ${({ theme }) => theme.accentColorLight};
  }
  ${({ isLoading }) =>
    isLoading &&
    css`
      &::before {
        content: "";
        background-color: ${({ theme }) => theme.accentColorLight};
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      &::after {
        content: "";
        width: 30px;
        height: 30px;
        border-top: 2px solid #fff;
        border-radius: 50%;
        border-left: 1px solid #fff;
        border-right: 2px solid transparent;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(0deg);
        color: #eee;
        font-size: 5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: spinning 0.9s linear infinite;
        @keyframes spinning {
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
      }
    `}
`;
export const AlertInfo = styled.p`
  padding: 2rem 0rem;
  font-size: 1.8rem;
  font-weight: 700;
  color: #e87c03;
`;
export const SignUpNow = styled.p`
  padding: 2.5rem 0;
  font-size: 1.6rem;
  color: #737373;
`;
export const SignUpButton = styled.button`
  cursor: pointer;
  display: inline-block;
  padding: 0 3px;
  color: #eee;
  font-size: 1.6rem;
`;
export const Message = styled.p`
  width: 100%;
  background-color: #e87c03;
  padding: 5px 20px;
  border-radius: 5px;
  margin-top: 4rem;
  margin-bottom: -2rem;
`;

import styled from "styled-components";

export const BackgroundImage = styled.div`
  position: absolute;
  top: -110px;
  left: 0;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.8) 0,
      rgba(0, 0, 0, 0.4) 60%,
      rgba(0, 0, 0, 0.8) 100%
    ),
    url("../images/misc/background.jpg");

  z-index: -1;
  background-position: bottom;
  background-size: cover;
`;
export const HeroSection = styled.section`
  position: relative;
  padding: 7rem 4.5rem;
  border-bottom: 0.8rem solid ${({ theme }) => theme.borderBottomColor};
`;
export const HeroWrapper = styled.div`
  max-width: 95rem;
  margin: 0 auto;
  padding: 7.5rem 0;
  text-align: center;
`;
export const HeroText = styled.div`
  padding: 0 7.5rem;

  h1 {
    font-size: 6.4rem;
  }
  h2 {
    font-size: 2.6rem;
    padding: 1.6rem 7.5rem;
  }
`;

export const CTAForm = styled.form`
  max-width: 95rem;
  margin-top: 1.36rem;
  h3 {
    font-size: 1.92rem;
    padding: 0 4.75rem 2rem 4.75rem;
  }
`;
export const FormContent = styled.div`
  display: flex;
  justify-content: center;
  /* max-width: ; */
`;
export const InputFiled = styled.div`
  min-width: 50rem;

  input {
    padding: 1rem 1rem 0 1rem;
    width: 100%;
    height: 7rem;
  }
`;
export const FormButton = styled.button`
  /* background: none; */
  /* outline: none; */
  border-left: 0.1rem solid #333;
  background-color: ${({ theme }) => theme.accentColor};
  font-size: 3rem;
  height: 7rem;
  padding: 0 3rem;
  border-radius: 0 1px 1px 0;
`;

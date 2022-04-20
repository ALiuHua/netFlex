import React from "react";
import { CTAForm, FormContent, InputFiled, FormButton } from "./HeroStyles";
const CTAFormComponent = () => {
  return (
    <CTAForm>
      <h3>
        Ready to watch Netflix? Enter your email to create or restart your
        membership.
      </h3>
      <FormContent>
        <InputFiled onClick={() => {}}>
          <input type="email" id="email"></input>
          <label htmlFor="email">Email address</label>
        </InputFiled>
        <FormButton>Get started</FormButton>
      </FormContent>
    </CTAForm>
  );
};

export default CTAFormComponent;



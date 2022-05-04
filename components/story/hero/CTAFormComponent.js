import React, { useState, useRef } from "react";
import {
  CTAForm,
  FormContent,
  InputFiled,
  Input,
  FormButton,
} from "./HeroStyles";
const CTAFormComponent = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [error, setError] = useState(null);
  // const emailRef = useRef();
  const setInputEmailHandler = (e) => {
    setInputEmail(e.target.value);
  };
  const setOnBlurHnadler = () => {};
  return (
    <CTAForm onSubmit={() => {}}>
      <h3>
        Ready to watch Netflix? Enter your email to create or restart your
        membership.
      </h3>
      <FormContent>
        <InputFiled>
          <Input
            type="email"
            id="email"
            onChange={setInputEmailHandler}
            onBlur={() => {}}
            value={inputEmail}
          />
          <label htmlFor="email">Email address</label>
        </InputFiled>
        <FormButton>Get started</FormButton>
      </FormContent>
    </CTAForm>
  );
};

export default CTAFormComponent;

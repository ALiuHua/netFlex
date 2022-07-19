import { useRouter } from "next/router";
import React, { useState, useRef } from "react";
import {
  CTAForm,
  FormContent,
  InputFiled,
  Input,
  FormButton,
  Error,
} from "./HeroStyles";
const CTAFormComponent = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const setInputEmailHandler = (e) => {
    setInputEmail(e.target.value);
    e.target.value.includes("@") && setError(null);
  };
  return (
    <CTAForm
      onSubmit={(e) => {
        e.preventDefault();
        inputEmail !== ""
          ? router.push(`/login?email=${inputEmail}&action=signup`)
          : setError(<Error> Valid Email is required</Error>);
      }}
    >
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
            value={inputEmail}
          />
          <label htmlFor="email">Email address</label>
          {error}
        </InputFiled>

        <FormButton>Get started</FormButton>
      </FormContent>
    </CTAForm>
  );
};

export default CTAFormComponent;

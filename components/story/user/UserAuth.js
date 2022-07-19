import React, { useState, useEffect, useReducer } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import {
  SignInWrapper,
  SignInContent,
  Form,
  Notification,
  FormButton,
  AlertInfo,
  SignUpNow,
  SignUpButton,
  ErrorInfo,
} from "./UserAuthStyle";
import { Background } from "../hero/Hero";
import UserInput from "./UserInput";
import heroImage from "../../../public/images/misc/signin.jpg";
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      enteredEmail: action.value,
      isEmailValid: action.value.includes("@"),
    };
  }

  if (action.type === "ON_BLUR") {
    return { ...state };
  }

  return { enteredEmail: "", isEmailValid: false };
};
const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      enteredPassword: action.value,
      isPasswordValid: action.value.trim().length > 5,
    };
  }
  if (action.type === "ON_BLUR") {
    return { ...state };
  }

  return { enteredPassword: "", isPasswordValid: false };
};
const createUser = async (email, password) => {
  const response = await fetch("/api/auth/signUp", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
  return data;
};
const UserAuth = () => {
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    enteredEmail: "",
    isEmailValid: false,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    enteredPassword: "",
    isPasswordValid: false,
  });
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignin, setIsSignin] = useState(true);
  const [err, setErr] = useState(null);
  const router = useRouter();
  const query = router.query;
  console.log(query);
  useEffect(() => {
    console.log("running");
    query?.email && dispatchEmail({ type: "USER_INPUT", value: query?.email });
    query?.action === "signup" && setIsSignin(false);
  }, [query]);

  async function submitHandler(event) {
    console.log("submithandlerrunning");
    event.preventDefault();
    if (emailState.enteredEmail === "") {
      setIsEmailTouched(true);
      dispatchEmail({ type: "ON_BLUR" });
      return;
    }
    if (passwordState.enteredPassword === "") {
      setIsPasswordTouched(true);
      dispatchPassword({ type: "ON_BLUR" });
      return;
    }
    // optional :add validation
    setIsLoading(true);
    if (isSignin) {
      //sign in
      console.log("sign in");
      const result = await signIn("credentials", {
        redirect: false,
        email: emailState.enteredEmail,
        password: passwordState.enteredPassword,
      });
      console.log(result);
      console.log(result.error);
      // setIsLoading(false);
      if (!result.error) {
        // setIsLoading(false);
        router.replace(`/browse`);
      } else {
        setErr(
          "Sorry, we can not log this account in. Please input correct email and password."
        );
        setIsLoading(false);
      }
    } else {
      //sign up
      console.log("sign up");

      try {
        setIsLoading(true);
        const result = await createUser(
          emailState.enteredEmail,
          passwordState.enteredPassword
        );
        console.log(result);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
        setErr(err.message);
      }
    }
  }
  // errorBorder only want it change after blur; so we need to let isTouched as an condition
  // becasue this value only change after blur

  return (
    <>
      <Background src={heroImage} altInfo="film poster collections" />
      <SignInWrapper>
        <SignInContent>
          <h2>{isSignin ? "Sign in" : "Sign Up"}</h2>
          {err && <ErrorInfo>{err}</ErrorInfo>}
          <Form>
            <UserInput
              type="email"
              id="Email"
              value={emailState.enteredEmail}
              errorBorder={isEmailTouched ? !emailState.enteredEmail : false}
              onChange={(e) =>
                dispatchEmail({
                  type: "USER_INPUT",
                  value: e.target.value,
                })
              }
              onBlur={() => {
                dispatchEmail({ type: "ON_BLUR" });
                setIsEmailTouched(true);
              }}
            />
            {!emailState.isEmailValid && isEmailTouched && (
              <Notification>Please enter a valid email address</Notification>
            )}
            <UserInput
              type="password"
              id="Password"
              value={passwordState.enteredPassword}
              errorBorder={
                isPasswordTouched ? !passwordState.enteredPassword : false
              }
              onChange={(e) =>
                dispatchPassword({
                  type: "USER_INPUT",
                  value: e.target.value,
                })
              }
              onBlur={() => {
                dispatchPassword({ type: "ON_BLUR" });
                setIsPasswordTouched(true);
              }}
            />
            {!passwordState.isPasswordValid && isPasswordTouched && (
              <Notification>
                Your password must contain more than 6 characters
              </Notification>
            )}
            <FormButton
              isLoading={isLoading}
              type="submit"
              onClick={submitHandler}
            >
              {isSignin ? "Sign in" : "Sign Up"}
            </FormButton>
          </Form>
          <SignUpNow>
            {isSignin
              ? " Need to create an account?"
              : "Already have an account?"}
            <SignUpButton
              onClick={() => {
                setIsSignin((prev) => !prev);
                if (err) setErr(null);
              }}
            >
              {isSignin ? "Sign up" : "Sign in"}
            </SignUpButton>
          </SignUpNow>
          <AlertInfo>
            Please be noted that this is just a NetFlix clone site for
            self-learning purpose.
          </AlertInfo>
        </SignInContent>
      </SignInWrapper>
    </>
  );
};

export default UserAuth;

import React from "react";
import { InputFiled, Input } from "./UserAuthStyle";

const UserInput = ({
  type,
  id,
  value,
  onChange,
  onBlur,
  onFocus,
  errorBorder,
}) => {
  return (
    <InputFiled>
      <Input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        errorBorder={errorBorder}
      />
      <label htmlFor={id}>{id}</label>
    </InputFiled>
  );
};

export default UserInput;

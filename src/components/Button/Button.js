import React from "react";
import { ButtonWrapper } from "./Button.styles";
const Button = (props) => {
  return <ButtonWrapper color={props.color}>{props.children}</ButtonWrapper>;
};

export default Button;

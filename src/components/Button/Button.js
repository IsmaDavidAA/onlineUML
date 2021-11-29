import React from "react";
import { ButtonWrapper } from "./Button.styles";
const Button = (props) => {
  return (
    <ButtonWrapper
      color={props.color}
      onClick={() => {
        props.action(props.typeAction);
      }}
    >
      {props.children}
    </ButtonWrapper>
  );
};

export default Button;

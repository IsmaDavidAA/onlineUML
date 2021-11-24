import React from "react";
import { ButtonWrapper } from "./Button.styles";
import { Link } from "react-router-dom";
const Button = (props) => {
  return (
    <Link to={props.url}>
      <ButtonWrapper color={props.color} href={props.url}>
        <p>{props.texto}</p>
      </ButtonWrapper>
    </Link>
  );
};

export default Button;

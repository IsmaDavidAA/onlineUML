import React from "react";
import { ButtonWrapper } from "./ButtonLink.styles";
import { Link } from "react-router-dom";
const ButtonLink = (props) => {
  return (
    <Link to={props.url}>
      <ButtonWrapper color={props.color}>
        <p>{props.texto}</p>
      </ButtonWrapper>
    </Link>
  );
};

export default ButtonLink;

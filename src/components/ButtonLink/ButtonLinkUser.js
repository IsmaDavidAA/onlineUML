import React from "react";
import { ButtonWrapper } from "./ButtonLinkUser.styles";
import { Link } from "react-router-dom";
const ButtonLink = (props) => {
  return (
    <Link to={props.url}>
      <ButtonWrapper theme={props.theme}>
        <p>{props.texto}</p>
      </ButtonWrapper>
    </Link>
  );
};

export default ButtonLink;

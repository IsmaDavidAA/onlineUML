import React from "react";
import { SeccionButtonWrapper } from "./SeccionButton.styles";

const SeccionButton = (props) => {
  return <SeccionButtonWrapper>{props.children}</SeccionButtonWrapper>;
};

export default SeccionButton;

import React from "react";
import { WrapperHeader } from "./Header.styles";
const Header = (props) => {
  return <WrapperHeader theme={props.theme}>{props.title}</WrapperHeader>;
};

export default Header;

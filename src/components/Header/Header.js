import React from "react";
import { WrapperHeader } from "./Header.styles";
const Header = (props) => {
  return <WrapperHeader>{props.title}</WrapperHeader>;
};

export default Header;

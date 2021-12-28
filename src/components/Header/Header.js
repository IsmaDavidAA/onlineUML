import React from "react";
import {
  Nav,
  NavLink,
  NavBtn,
} from "./Header.styles";

const Header = (props) =>{
  return (
    <>
      <Nav>
        <NavLink to="/">
          <h1>GoUML</h1>
        </NavLink>
        <NavBtn theme={props.theme}>{props.title}</NavBtn>
      </Nav>
    </>
  );
};

export default Header;

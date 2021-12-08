import React from "react";
import { MenuItem, MenuOption, MenuWrapper } from "./Menu.styles";

const Menu = (props) => {
  return (
    <MenuWrapper visible={props.visible} left={props.left} top={props.top}>
      <MenuOption>
        <MenuItem
          onClick={() => {
            props.actions[0]();
            props.actions[1]();
          }}
        >
          Editar
        </MenuItem>
        <MenuItem>Elminar</MenuItem>
      </MenuOption>
    </MenuWrapper>
  );
};

export default Menu;

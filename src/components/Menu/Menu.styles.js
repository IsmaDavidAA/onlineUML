import styled from "styled-components";

export const MenuWrapper = styled.menu`
  width: 120px;
  z-index: 9;
  box-shadow: 0 4px 5px 3px rgba(0, 0, 0, 0.2);
  position: fixed;
  display: ${(props) => (props.visible ? "block" : "none")};
  left: ${(props) => props.left + "px"};
  top: ${(props) => props.top + "px"};
  background-color: #fff;
  transition: 0.2s display ease-in;
  font-family: "Fredoka One", cursive;
`;

export const MenuOption = styled.ul`
  list-style: none;
  padding: 10px 0;
  z-index: 1;
`;

export const MenuItem = styled.li`
  font-weight: 500;
  z-index: 1;
  font-size: 14px;
  padding: 10px 40px 10px 20px;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

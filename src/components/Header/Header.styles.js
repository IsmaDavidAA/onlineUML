import styled from 'styled-components'
import { NavLink as Link } from 'react-router-dom'


export const Nav = styled.nav`
  background: var(--neutro);
  box-shadow: 0px 0px 10px 0 #999999;
  height: 50px;
  width: 100%;
  display: flex;
  padding: 0px;
  z-index;10;
  justify-content: flex-start;
  font-family: "Fredoka One", cursive;
`;

export const NavLink = styled(Link)`
  color: #000;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;

`;


export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  justify-content: end;
  width: 80vw;
`;


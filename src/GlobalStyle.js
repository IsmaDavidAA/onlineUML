import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root {
        --white: #fff;
        --black: #000;
        --svg: #00B1D2FF;
        --canvas: #FDDB27FF;
    }
    * {
        margin:0px;
        padding:0px;
    }
`;

export const WrapperView = styled.div`
  background: #e2e2e2;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const WrapperBoard = styled.div`
  background: black;
  flex: auto;
`;

export const WrapperDesktop = styled.div`
  background: black;
  display: flex;
  flex: auto;
`;

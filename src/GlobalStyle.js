import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root {
        --white: #fff;
        --black: #000;
        --blue: #1E3163;
        --blueAgua: #0061A8;
        --plomo: #999999;
        --plomoAgua: #C4C4C4;
        --blueSuave: #8AB6D6;
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

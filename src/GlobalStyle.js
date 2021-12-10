import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
        --white: #fff;
        --black: #000;
        --svg: #20A4F3;
        --canvas: #fca311;
        --neutro: #E3E3E3;
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
  background: var(--neutro);
  flex: auto;
`;

export const WrapperDesktop = styled.div`
  background: var(--neutro);
  display: flex;
  flex: auto;
`;

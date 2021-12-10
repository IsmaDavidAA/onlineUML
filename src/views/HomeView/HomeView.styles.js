import styled from "styled-components";

export const WrapperView = styled.div`
  background: white;
  align-items: center;
  min-height: 100vh;
  display: flex;
`;

export const WrapperButton = styled.div`
  background: ${(props) =>
    props.theme === "canvas" ? "var(--svg)" : "var(--canvas)"};
  display: flex;
  justify-content: ${(props) =>
    props.theme === "canvas" ? "flex-start" : "flex-end"};
  align-items: center;
  width: 50%;
  height: 100vh;
`;

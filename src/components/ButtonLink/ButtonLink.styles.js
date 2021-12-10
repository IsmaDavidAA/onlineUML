import styled from "styled-components";

export const ButtonWrapper = styled.button`
  min-width: 300px;
  min-height: 300px;
  background: ${(props) =>
    props.theme === "svg" ? "var(--svg)" : "var(--canvas)"};
`;

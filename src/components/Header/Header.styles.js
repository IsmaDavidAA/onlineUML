import styled from "styled-components";

export const WrapperHeader = styled.div`
  background: ${(props) =>
    props.theme === "canvas" ? "var(--svg)" : "var(--canvas)"};
  padding: 0px;
  box-shadow: 0px 0px 10px 0 #999999;
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Fredoka One", cursive;
`;

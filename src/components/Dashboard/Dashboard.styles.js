import styled from "styled-components";

export const WrapperDashboard = styled.div`
  background: ${(props) =>
    props.theme === "svg" ? "var(--svg)" : "var(--canvas)"};
  align-items: center;
  display: flex;
  justify-content: center;
  width: 120px;
  min-height: 100%;
  flex-direction: column;
`;

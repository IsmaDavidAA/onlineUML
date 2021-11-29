import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  display:${(props) => (props.isOpenM ? "flex;" : "none;")}
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.div`
  position: relative;
  padding: 1rem;
  min-width: 320px;
  max-width: 480px;
  min-height: 200px;
  max-height: 600px;
  overflow-y: auto;
  background-color: #fff;
  text-align: center;
`;

export const Close = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

export const Open = styled.div`
  display: flex;
`;

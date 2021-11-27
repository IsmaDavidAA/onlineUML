import React from "react";
import { Wrapper, ModalContainer, Close } from "./Modal.styles";
const Modal = ({ children, isOpen, closeModal, hasClose = false }) => {
  const handleModalContainerClick = (e) => e.stopPropagation();
  return (
    <Wrapper isOpenM={isOpen}>
      <ModalContainer onClick={handleModalContainerClick}>
        {hasClose ? <Close onClick={closeModal}>❌</Close> : <></>}
        {children}
      </ModalContainer>
    </Wrapper>
  );
};

export default Modal;

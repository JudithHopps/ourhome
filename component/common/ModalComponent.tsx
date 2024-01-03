import React, { ReactNode } from "react";
import styled from "styled-components";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  width: 35vw;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <>
      <Overlay onClick={onClose} />

      <ModalWrapper>{children}</ModalWrapper>
    </>
  );
};

export default Modal;

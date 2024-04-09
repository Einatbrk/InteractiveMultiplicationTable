/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

const Modal = ({ message, onConfirm, onCancel, className }) => {
  const modalRoot = document.getElementById('modal-root');
  const modalElement = document.createElement('div');

  useEffect(() => {
    modalRoot.appendChild(modalElement);

    return () => {
      modalRoot.removeChild(modalElement);
    };
  }, [modalElement, modalRoot]);

  return createPortal(
    <div className={className}>
      <p>{message}</p>
      <button onClick={onConfirm}>OK</button>
      <button onClick={onCancel}>Cancel</button>
    </div>,
    modalElement
  );
};

export default Modal;

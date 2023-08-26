import styles from './Modal.module.css';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ toggleModal, children }) => {
  const handleKeydown = evt => {
    if (evt.code === 'Escape') toggleModal();
  };
  const handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      toggleModal();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [toggleModal]);
  const modalRoot = document.querySelector('#modal-root');
  return createPortal(
    <div className={styles.Overlay} onClick={handleBackdropClick}>
      <div className={styles.Modal}>{children}</div>
    </div>,
    modalRoot
  );
};
export default Modal;

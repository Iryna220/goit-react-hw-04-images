import styles from './Modal.module.css';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');
const Modal = ({ toggleModal, largeImage }) => {
  useEffect(() => {
    const handleKeydown = evt => {
      if (evt.code === 'Escape') toggleModal();
    };
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [toggleModal]);

  const handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      toggleModal();
    }
  };

  return createPortal(
    <div className={styles.Overlay} onClick={handleBackdropClick}>
      <div className={styles.Modal}>
        <img src={largeImage.src} alt="" />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;

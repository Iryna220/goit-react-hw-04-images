import styles from './Modal.module.css';
import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');
class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }
  handleKeydown = evt => {
    if (evt.code === 'Escape') {
      return this.props.toggleModal();
    }
  };

  handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      return this.props.toggleModal();
    }
  };

  render() {
    const { handleBackdropClick } = this;
    const {
      largeImage: { src },
    } = this.props;
    return createPortal(
      <div className={styles.Overlay} onClick={handleBackdropClick}>
        <div className={styles.Modal}>
          <img src={src} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;

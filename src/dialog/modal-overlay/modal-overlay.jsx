import styles from './modal-overlay.module.scss';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const ModalOverlay = ({ children, closeAction }) => {
  useEffect(() => {
    document.addEventListener('keydown', keyPressHandler);

    return () => {
      document.removeEventListener('keydown', keyPressHandler);
    };
  }, []);

  const keyPressHandler = (event) => {
    if (event.key === 'Escape') {
      closeAction();
    }
  };

  const onOverlayClick = (event) => {
    if (event.target.id === 'modalOverlay') {
      closeAction();
    }
  }

  return (
    <div
      id='modalOverlay'
      className={styles.modal_overlay}
      onClick={onOverlayClick}
    >
      {children}
    </div>
  );
};

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  closeAction: PropTypes.func.isRequired
};

export default ModalOverlay;

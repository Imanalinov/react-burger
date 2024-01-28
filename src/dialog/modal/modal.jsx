import styles from './modal.module.scss';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import ModalOverlay from '../modal-overlay/modal-overlay';

const Modal = ({ children, closeAction, title = '' }) => {
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

  const closeModal = (event) => {
    if (event.target.id === 'modal') {
      closeAction();
    }
  }

  return (
    <>
      <ModalOverlay />
      <div
        id="modal"
        className={styles.modal}
        onClick={closeModal}
      >
        <div className={styles['modal--wrapper']}>
          <div className={styles['modal--header']}>
            <p className={`text text_type_main-large`}>{title}</p>
            <CloseIcon
              type="primary"
              onClick={closeAction}
            />
          </div>
          <div className={styles['modal--container']}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  closeAction: PropTypes.func.isRequired,
  title: PropTypes.string
};

export default Modal;

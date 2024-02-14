import styles from './modal.module.scss';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { createPortal } from 'react-dom';

const Modal = ({ children, closeAction, title = '' }) => {
  const modalContainer = document.getElementById('modals_container');

  useEffect(() => {
    document.addEventListener('keydown', keyPressHandler);

    return () => {
      document.removeEventListener('keydown', keyPressHandler);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const keyPressHandler = (event) => {
    if (event.key === 'Escape') {
      closeAction();
    }
  };

  return (
    createPortal(
      <>
        <ModalOverlay onClose={closeAction} />
        <div
          id="modal"
          className={styles.modal}
        >
          <div className={styles['modal--wrapper']}>
            <div className={styles['modal--header']}>
              <p className={`text text_type_main-large`}>{title}</p>
              <CloseIcon
                type="primary"
                onClick={closeAction}
              />
            </div>
            <div>
              {children}
            </div>
          </div>
        </div>
      </>,
      modalContainer
    )
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  closeAction: PropTypes.func.isRequired,
  title: PropTypes.string
};

export default Modal;

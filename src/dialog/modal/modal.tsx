import styles from './modal.module.scss';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect } from 'react';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { createPortal } from 'react-dom';

interface Props {
  children: React.ReactNode;
  closeAction: () => void;
  title?: string;
}

const Modal: React.FC<Props> = ({ children, closeAction, title = '' }: Props) => {
  const modalContainer = document.getElementById('modals_container')!;

  useEffect(() => {
    const keyPressHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeAction();
      }
    };
    document.addEventListener('keydown', keyPressHandler);

    return () => {
      document.removeEventListener('keydown', keyPressHandler);
    };
  }, []);



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

export default Modal;

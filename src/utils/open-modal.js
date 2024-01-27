import ModalOverlay from '../dialog/modal-overlay/modal-overlay';
import Modal from '../dialog/modal/modal';
import { createPortal } from 'react-dom';
import React from 'react';

export const openModal = (modal, closeAction, header = '') => {
  const modalContainer = document.getElementById('modals_container');

  return createPortal(
    <ModalOverlay
      closeAction={closeAction}
    >
      <Modal
        title={header}
        closeAction={closeAction}
      >
        {modal}
      </Modal>
    </ModalOverlay>,
    modalContainer
  );
}

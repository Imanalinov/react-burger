import styles from './modal-overlay.module.scss';
import React from 'react';

interface Props {
  onClose: () => void;
}

const ModalOverlay: React.FC<Props> = ({ onClose }) => {
  return (
    <div
      onClick={onClose}
      className={styles.modal_overlay}
    ></div>
  );
};

export default ModalOverlay;

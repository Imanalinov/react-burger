import styles from './modal-overlay.module.scss';
import PropTypes from 'prop-types';

const ModalOverlay = ({ onClose }) => {
  return (
    <div
      onClick={onClose}
      className={styles.modal_overlay}
    ></div>
  );
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default ModalOverlay;

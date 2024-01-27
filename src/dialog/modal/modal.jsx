import styles from './modal.module.scss';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const Modal = ({ children, closeAction, title = '' }) => {
  return (
    <div className={styles.modal}>
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
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  closeAction: PropTypes.func.isRequired,
  title: PropTypes.string
};

export default Modal;

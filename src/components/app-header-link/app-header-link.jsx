import styles from './app-header-link.module.scss';
import PropTypes from 'prop-types';

const AppHeaderLink = ({ text, icon, isFirst = false, isActive = false }) => {
  return (
    <a className={`p-5 ${styles.link} ${isFirst ? styles.first : ''} ${isActive ? styles.active : ''}`}>
      {icon}
      <p className="text text_type_main-default">
        {text}
      </p>
    </a>
  );
};

AppHeaderLink.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  isFirst: PropTypes.bool,
  isActive: PropTypes.bool,
};

export default AppHeaderLink;

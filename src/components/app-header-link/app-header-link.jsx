import styles from './app-header-link.module.scss';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { clsx } from 'clsx';

const AppHeaderLink = ({ text, icon, to = '/', isFirst = false }) => {
  const navLinkClass = (isActive)  => clsx(
    'p-5',
    styles.link,
    isFirst && styles.first,
    isActive && styles.active
  );

  return (
    <NavLink
      className={({ isActive }) => navLinkClass(isActive)}
      to={to}
    >
      {icon}
      <p className="text text_type_main-default">
        {text}
      </p>
    </NavLink>
  );
};

AppHeaderLink.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  isFirst: PropTypes.bool,
  to: PropTypes.string
};

export default AppHeaderLink;

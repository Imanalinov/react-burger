import styles from './app-header-link.module.scss';
import { NavLink } from 'react-router-dom';
import { clsx } from 'clsx';
import React from 'react';

interface Props {
  text: string;
  icon: React.JSX.Element;
  to?: string;
  isFirst?: boolean;
}

const AppHeaderLink: React.FC<Props> = ({ text, icon, to = '/', isFirst = false }) => {
  const navLinkClass = (isActive: boolean)  => clsx(
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

export default AppHeaderLink;

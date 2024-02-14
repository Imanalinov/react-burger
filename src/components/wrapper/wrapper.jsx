import styles from './wrapper.module.scss';
import AppHeader from '../app-header/app-header';
import { Outlet } from 'react-router-dom';
import React from 'react';

export function Wrapper() {
  return (
    <div className={`${styles.main_container} h-screen`}>
      <AppHeader />
      <Outlet />
    </div>
  );
}

import styles from './profile-wrapper.module.scss';

import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

import { useDispatch, useSelector } from '../../../models/store.model';
import { getUserAPI, logoutAPI } from '../../../services/actions/user';

export function ProfileWrapperComponent() {
  const userState = useSelector(store => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserAPI());
  }, [dispatch])

  const onLeave = () => {
    dispatch(logoutAPI()).then(() => {
      navigate('/', { replace: true });
    })
  };

  if (userState.loading && !userState.user) {
    return null;
  }

  return (
    <section className={styles.profile__section}>
      <aside className={styles.profile__aside}>
        <ul className={`mb-20 ${styles.list}`}>
          <li className={styles.list__item}>
            <NavLink
              to={'/profile'}
              className={({ isActive }) => isActive ? styles.list__item_active : ''}
              end={true}
            >
              <p className="text text_type_main-medium">
                Профиль
              </p>
            </NavLink>
          </li>
          <li className={styles.list__item}>
            <NavLink
              to={'/profile/order'}
              className={({ isActive }) => isActive ? styles.list__item_active : ''}
            >
              <p className={`text text_type_main-medium`}>
                История заказов
              </p>
            </NavLink>
          </li>
          <li
            className={styles.list__item}
          >
            <button
              className={styles.list__button}
              onClick={onLeave}
              disabled={userState.loading}
            >
              <p className="text text_type_main-medium">
                Выход
              </p>
            </button>

          </li>
        </ul>
        <p className={'text text_type_main-default text_color_inactive'}>
          В этом разделе вы можете <br />
          изменить свои персональные данные
        </p>
      </aside>
      <main className='grow'>
        <Outlet />
      </main>
    </section>
  )
}

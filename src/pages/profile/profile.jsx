import styles from './profile.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAPI } from '../../services/actions/user';
import { EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';

export const ProfilePage = () => {
  const userState = useSelector(store => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState('******');

  const onLeave = () => {
    dispatch(logoutAPI()).then(() => {
      navigate('/', { replace: true });
    })
  };

  const onFormChange = (event) => {

  }

  const onIconClick = () => {

  }

  return ( !userState.loading && userState.user &&
    <section className={styles.profile__section}>
      <aside className={styles.profile__aside}>
        <ul className={`mb-20 ${styles.list}`}>
          <li className={styles.list__item}>
            <NavLink to={'/profile'} className={({isActive}) => isActive ? styles.list__item_active : ''}>
              <p className="text text_type_main-medium">
                Профиль
              </p>
            </NavLink>
          </li>
          <li className={styles.list__item}>
            <NavLink to={'/'}>
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
          В этом разделе вы можете <br/>
          изменить свои персональные данные
        </p>
      </aside>
      <main>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={onFormChange}
          icon={'EditIcon'}
          value={userState.user.name}
          name={'name'}
          onIconClick={onIconClick}
        />
        <EmailInput
          onChange={onFormChange}
          value={userState.user?.email}
          name={'email'}
          placeholder="Логин"
          isIcon={true}
          extraClass="mt-6"
        />
        <PasswordInput
          onChange={onFormChange}
          value={password}
          name={'password'}
          extraClass="mt-6"
          icon={'EditIcon'}
        />
      </main>
    </section>
  )
};

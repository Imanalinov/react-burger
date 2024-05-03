import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

import styles from './app-header.module.scss';
import AppHeaderLink from '../app-header-link/app-header-link';
import { useSelector } from '../../models/store.model';

const AppHeader = () => {
  const isLogged = useSelector(store => store.user.isLogged);

  return (
    <header className={styles.header}>

      <div className={styles['header--link_wrapper']} >
        <AppHeaderLink
          text='Конструктор'
          icon={<BurgerIcon type="primary" />}
          isFirst={true}
        />
        <AppHeaderLink
          text='Лента заказов'
          icon={<ListIcon  type="secondary" />}
          to={'/feed'}
        />
      </div>

      <div className={styles['header--logo']}>
        <Link to='/' >
          <Logo />
        </Link>
      </div>

      <div className={styles['header--link_wrapper-end']}>
        <AppHeaderLink
          text='Личный кабинет'
          icon={<ProfileIcon type="secondary" />}
          to={isLogged ? '/profile' : '/login'}
        />
      </div>
    </header>
  )
}

export default AppHeader;

import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.scss';
import AppHeaderLink from '../app-header-link/app-header-link';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IStoreState } from '../../models/store.model';
import { IUserState } from '../../services/slices/user';

const AppHeader = () => {
  const userState = useSelector<IStoreState, IUserState>(store => store.user);

  return (
    <nav className={styles.header}>

      <div className={styles['header--link_wrapper']} >
        <AppHeaderLink
          text='Конструктор'
          icon={<BurgerIcon type="primary" />}
          isFirst={true}
        />
        <AppHeaderLink
          text='Лента заказов'
          icon={<ListIcon  type="secondary" />}
          to={'/'}
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
          to={userState.isLogged ? '/profile' : '/login'}
        />
      </div>
    </nav>
  )
}

export default AppHeader;

import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.scss';
import AppHeaderLink from '../app-header-link/app-header-link';

const AppHeader = () => {
  return (
    <nav className={styles.header}>

      <div className={styles['header--link_wrapper']} >
        <AppHeaderLink
          text='Конструктор'
          icon={<BurgerIcon type="primary" />}
          isFirst={true}
          isActive={true}
        />
        <AppHeaderLink
          text='Лента заказов'
          icon={<ListIcon  type="secondary" />}
        />
      </div>

      <div className={styles['header--logo']}>
        <Logo />
      </div>

      <div className={styles['header--link_wrapper-end']}>
        <AppHeaderLink
          text='Личный кабинет'
          icon={<ProfileIcon type="secondary" />}
        />
      </div>
    </nav>
  )
}

export default AppHeader;

import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import './app-header.scss';

const AppHeaderLink = ({ text, icon, isFirst = false }) => {
  return (
    <a className={`p-5 link ${isFirst ? 'first' : '' }`}>
      {icon}
      <p className="text text_type_main-default">
        {text}
      </p>
    </a>
  )
}

const AppHeader = () => {
  return (
    <nav className={`header`}>

      <div className={`header--link_wrapper`} >
        <AppHeaderLink
          text='Конструктор'
          icon={<BurgerIcon type="primary" />}
          isFirst={true}
        />
        <AppHeaderLink
          text='Лента заказов'
          icon={<ListIcon  type="primary" />}
        />
      </div>

      <div className={`header--logo`}>
        <Logo />
      </div>

      <div className={`header--link_wrapper-end`}>
        <AppHeaderLink
          text='Личный кабинет'
          icon={<ProfileIcon type="primary" />}
        />
      </div>
    </nav>
  )
}

export default AppHeader;

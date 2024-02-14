import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Если пользователь авторизован,
 * то мы перенаправляем его на страницу профиля
 */
export const UnauthorizedUserGuard = ({ element }) => {
  const { isLogged } = useSelector(store => store.user);
  const navigate = useNavigate();

  if (!isLogged) {
    return element;
  }

  navigate('/profile');
  return null;
};

UnauthorizedUserGuard.propTypes = {
  element: PropTypes.element.isRequired
};

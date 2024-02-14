import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Если пользователь не авторизован,
 * то мы перенаправляем его на страницу авторизации
 */
export const AuthorizedUserGuard = ({ element }) => {
  const { isLogged } = useSelector(store => store.user);
  const navigate = useNavigate();

  if (isLogged) {
    return element;
  }

  navigate('/login');
  return null;
};

AuthorizedUserGuard.propTypes = {
  element: PropTypes.element.isRequired
};

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

/**
 * Если пользователь авторизован,
 * то мы перенаправляем его на страницу профиля
 */
export const UnauthorizedUserGuard = ({ element }) => {
  const isLogged = useSelector(store => store.user.isLogged);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) {
      navigate('/profile');
    }
  }, [isLogged, navigate])

  return !isLogged ? element : null;
};

UnauthorizedUserGuard.propTypes = {
  element: PropTypes.element.isRequired
};

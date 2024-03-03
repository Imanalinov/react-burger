import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

/**
 * Если пользователь не авторизован,
 * то мы перенаправляем его на страницу авторизации
 */
export const AuthorizedUserGuard = ({ element }) => {
  const isLogged = useSelector(store => store.user.isLogged);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigate('/login');
    }
  }, [isLogged, navigate]);

  return isLogged ? element : null;
};

AuthorizedUserGuard.propTypes = {
  element: PropTypes.element.isRequired
};

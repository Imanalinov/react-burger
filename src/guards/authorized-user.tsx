import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector } from '../models/store.model';

interface Props {
  element: React.JSX.Element
}

/**
 * Если пользователь не авторизован,
 * то мы перенаправляем его на страницу авторизации
 */
export const AuthorizedUserGuard = ({ element }: Props) => {
  const isLogged = useSelector(store => store.user.isLogged);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigate('/login');
    }
  }, [isLogged, navigate]);

  return isLogged ? element : null;
};

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { IStoreState } from '../models/store.model';

interface Props {
  element: React.JSX.Element
}

/**
 * Если пользователь авторизован,
 * то мы перенаправляем его на страницу профиля
 */
export const UnauthorizedUserGuard = ({ element }: Props): React.JSX.Element | null => {
  const isLogged = useSelector<IStoreState>(store => store.user.isLogged);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) {
      navigate('/profile');
    }
  }, [isLogged, navigate])

  return !isLogged ? element : null;
};

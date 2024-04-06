import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector } from '../models/store.model';

interface Props {
  element?: React.ReactElement | null,
  children?: React.ReactElement,
}

/**
 * Если пользователь не авторизован,
 * то мы перенаправляем его на страницу авторизации
 */
export const AuthorizedUserGuard: React.FC<Props> = ({ element, children }: Props) => {
  const isLogged = useSelector(store => store.user.isLogged);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigate('/login');
    }
  }, [isLogged, navigate]);

  const component: React.ReactNode | null = children || element;
  if (!component) {
    return null;
  }

  return isLogged ? component : null;
};

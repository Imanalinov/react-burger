import { useSelector } from '../models/store.model';
import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';

interface Props {
  children: React.ReactElement;
  /**
   * Показывает защищенный гард или нет.
   *
   * Если anonymous = false, то мы переадресовываем
   * пользователя на страницу "/login".
   *
   * Если anonymous = true, то на предыдущую страницу,
   * если такая есть, если нет, то "/".
   */
  anonymous: boolean;
}

export function ProtectedRoute({ children, anonymous = false }: Props): React.ReactElement | null {
  const isLoggedIn = useSelector((store) => store.user.isLogged);

  const location = useLocation();
  const from = location.state?.from || '/';
  // Если разрешен неавторизованный доступ, а пользователь авторизован...
  if (anonymous && isLoggedIn) {
    // ...то отправляем его на предыдущую страницу
    return <Navigate to={ from } />;
  }

  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && !isLoggedIn) {
    // ...то отправляем его на страницу логин
    return <Navigate to="/login" state={{ from: location}}/>;
  }

  // Если все ок, то рендерим внутреннее содержимое
  return children;
}

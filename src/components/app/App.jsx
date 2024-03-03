import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from '../../utils/token';
import { getUserAPI } from '../../services/actions/user';
import {
  ForgotPasswordPage, IngredientDetailsPage, LoginPage, MainPage, ProfilePage, RegisterPage, ResetPasswordPage
} from '../../pages';

import { UnauthorizedUserGuard } from '../../guards/unauthorized-user';
import { AuthorizedUserGuard } from '../../guards/authorized-user';
import { Wrapper } from '../wrapper/wrapper';

function App() {
  const dispatch = useDispatch();
  const userState = useSelector(store => store.user);

  useEffect(() => {
    const accessToken = userState.accessToken || getAccessToken();
    if (accessToken) {
      dispatch(getUserAPI())
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wrapper />}>
          <Route
            path="/"
            element={
              <MainPage />
            }
          />
          <Route
            path="/login"
            element={
              <UnauthorizedUserGuard element={<LoginPage />} />
            }
          />
          <Route
            path="/register"
            element={
              <UnauthorizedUserGuard element={<RegisterPage />} />
            }
          />
          <Route
            path="/forgot-password"
            element={
              <UnauthorizedUserGuard element={<ForgotPasswordPage />} />
            }
          />
          <Route
            path="/reset-password"
            element={
              <UnauthorizedUserGuard element={<ResetPasswordPage />} />
            }
          />
          <Route
            path="/profile"
            element={
              <AuthorizedUserGuard element={<ProfilePage />} />
            }
          />
          <Route
            path="ingredients/:id"
            element={
              <IngredientDetailsPage />
            }
          />
        </Route>
        <Route
          path="*"
          element={<Navigate replace to='/' />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { getAccessToken } from '../../utils/token';
import { getUserAPI } from '../../services/actions/user';
import {
  ForgotPasswordPage, IngredientDetailsPage, LoginPage, MainPage, OrderFeedPage, OrderInformationPage,
  ProfileOrdersNumberPage, ProfileOrdersPage, ProfilePage, RegisterPage, ResetPasswordPage
} from '../../pages';

import { UnauthorizedUserGuard } from '../../guards/unauthorized-user';
import { AuthorizedUserGuard } from '../../guards/authorized-user';
import { Wrapper } from '../wrapper/wrapper';
import { useDispatch, useSelector } from '../../models/store.model';
import { ProfileWrapperComponent } from '../profile/profile-wrapper';
import { getIngredientsAPI } from '../../services/slices/ingredients';

function App() {
  const dispatch = useDispatch();
  const accessTokenState = useSelector(store => store.user.accessToken);

  React.useEffect(() => {
    const accessToken = accessTokenState || getAccessToken();
    if (accessToken) {
      dispatch(getUserAPI())
    }
    dispatch(getIngredientsAPI());
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
            path="/order-feed"
            element={<OrderFeedPage />}
          />
          <Route path="/order-feed/:id">
            <AuthorizedUserGuard>
              <OrderInformationPage />
            </AuthorizedUserGuard>
          </Route>
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
              <AuthorizedUserGuard element={<ProfileWrapperComponent />} />
            }
          >
            <Route
              path="/profile"
              element={
                <AuthorizedUserGuard element={<ProfilePage />} />
              }
            />
            <Route
              path="/profile/order"
              element={
                <AuthorizedUserGuard element={<ProfileOrdersPage />} />
              }
            />
            <Route
              path="/profile/order/:number"
              element={
                <AuthorizedUserGuard element={<ProfileOrdersNumberPage />} />
              }
            />
            <Route path="/profile/orders/:id">
              <AuthorizedUserGuard>
                <OrderInformationPage />
              </AuthorizedUserGuard>
            </Route>
          </Route>
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

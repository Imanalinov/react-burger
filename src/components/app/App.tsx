import React from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { getAccessToken } from '../../utils/token';
import { getUserAPI } from '../../services/actions/user';
import {
  ForgotPasswordPage, LoginPage, MainPage, OrderFeedPage, OrderInformationPage, ProfileOrdersPage, ProfilePage,
  RegisterPage, ResetPasswordPage
} from '../../pages';
import { Wrapper } from '../wrapper/wrapper';
import { useDispatch, useSelector } from '../../models/store.model';
import { ProfileWrapperComponent } from '../profile/profile-wrapper';
import { getIngredientsAPI } from '../../services/slices/ingredients';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../../dialog/modal/modal';
import { ProtectedRoute } from '../../guards/protected-route';

function App() {
  const dispatch = useDispatch();
  const accessTokenState = useSelector(store => store.user.accessToken);
  const location = useLocation();
  const navigate = useNavigate();
  const page = location.state && location.state.page;

  React.useEffect(() => {
    const accessToken = accessTokenState || getAccessToken();
    if (accessToken) {
      dispatch(getUserAPI())
    }
    dispatch(getIngredientsAPI());
  }, [dispatch]);

  const onCloseModal = () => {
    navigate(-1);
  };

  return (
    <main>
      <Routes location={page || location}>
        <Route path="/" element={<Wrapper />}>
          <Route path="/" element={<MainPage />} />
          <Route path='/ingredients/:id' element={<IngredientDetails/>}/>
          <Route
            path="/order-feed"
            element={<OrderFeedPage />}
          />
          <Route
            path="order-feed/:id"
            element={
              <OrderInformationPage page="orderFeed" />
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute anonymous={true}>
                <LoginPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute anonymous={true}>
                <RegisterPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <ProtectedRoute anonymous={true}>
                <ForgotPasswordPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <ProtectedRoute anonymous={true}>
                <ResetPasswordPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute anonymous={false}>
                <ProfileWrapperComponent />
              </ProtectedRoute>
            }
          >
            <Route
              path="/profile"
              element={
                <ProtectedRoute anonymous={false}>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/order"
              element={
                <ProtectedRoute anonymous={false}>
                  <ProfileOrdersPage />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path="/profile/orders/:id"
            element={
              <ProtectedRoute anonymous={false}>
                <OrderInformationPage page="profile" />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="*"
          element={<Navigate replace to='/' />}
        />
      </Routes>
      {
        page && (
          <Routes>
            <Route
              path='/ingredients/:id'
               element={
                 <Modal title={'Детали ингредиента'} closeAction={onCloseModal}>
                   <IngredientDetails/>
                 </Modal>
               }
            />
            <Route
              path="order-feed/:id"
              element={
                <Modal title={'Детали ингредиента'} closeAction={onCloseModal}>
                  <OrderInformationPage page="orderFeed" />
                </Modal>
              }
            />
            <Route
              path="/profile/orders/:id"
              element={
                <ProtectedRoute anonymous={false}>
                  <Modal title={'Детали ингредиента'} closeAction={onCloseModal}>
                    <OrderInformationPage page="profile" />
                  </Modal>
                </ProtectedRoute>
              }
            />
          </Routes>
        )
      }
    </main>
  );
}

export default App;

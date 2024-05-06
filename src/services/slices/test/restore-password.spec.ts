import { initialState, rootReducer } from '../index';
import { configureStore } from '@reduxjs/toolkit';
import { IRestorePasswordState, restorePasswordSlice } from '../restore-password';
import { forgotPasswordAPI, resetPasswordAPI } from '../../actions/restore-password';
import { IResetPasswordRequest, IResponseWithSuccess } from '../../../models';

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false
  }),
  devTools: true,
  preloadedState: initialState
});

describe('Restore Password slice', () => {

  let initialRestorePassword: IRestorePasswordState;

  beforeEach(() => {
    initialRestorePassword = {
      forgotPassword: {
        loading: false,
        error: false,
        response: null
      },
      resetPassword: {
        loading: false,
        error: false,
        response: null
      },
      email: '',
      password: '',
      token: ''
    };
  });

  it('Should return the initial state', () => {
    expect(store.getState().restorePassword).toEqual(initialRestorePassword);
  });

  it('should set email when user forgot password', () => {
    initialRestorePassword.email = 'test@test.com';

    expect(restorePasswordSlice.reducer(
      undefined,
      restorePasswordSlice.actions.forgotPasswordSetValue('test@test.com')
    )).toEqual(initialRestorePassword);
  });

  it('should set password "new_password" for reset password', () => {
    initialRestorePassword.password = 'new_password';

    expect(restorePasswordSlice.reducer(
      undefined,
      restorePasswordSlice.actions.resetPasswordSetValue({ field: 'password', value: 'new_password' })
    )).toEqual(initialRestorePassword);
  });

  it('should set token "YgaLasd" for reset password', () => {
    initialRestorePassword.token = 'YgaLasd';

    expect(restorePasswordSlice.reducer(
      undefined,
      restorePasswordSlice.actions.resetPasswordSetValue({ field: 'token', value: 'YgaLasd' })
    )).toEqual(initialRestorePassword);
  });

  it('should set token and new password for reset password with save previous state', () => {
    initialRestorePassword.email = 'test@test.com';
    initialRestorePassword.password = 'new_password';
    initialRestorePassword.token = 'YgaLasd';

    store.dispatch(restorePasswordSlice.actions.forgotPasswordSetValue('test@test.com'));
    store.dispatch(restorePasswordSlice.actions.resetPasswordSetValue({ field: 'token', value: 'YgaLasd' }));
    store.dispatch(restorePasswordSlice.actions.resetPasswordSetValue({ field: 'password', value: 'new_password' }));

    expect(store.getState().restorePassword).toEqual(initialRestorePassword);
  });

  it('should return forgotPasswordAPI.pending', () => {
    initialRestorePassword.forgotPassword = {
      loading: true,
      error: false,
      response: null
    };

    expect(restorePasswordSlice.reducer(undefined, forgotPasswordAPI.pending('', ''))).toEqual(initialRestorePassword);
  });

  it('should return forgotPasswordAPI.fulfilled', () => {
    const response = {
      success: true,
      message: 'success'
    };

    initialRestorePassword.forgotPassword = {
      loading: false,
      error: false,
      response: response
    };

    expect(restorePasswordSlice.reducer(undefined, forgotPasswordAPI.fulfilled(response, '', '')))
      .toEqual(initialRestorePassword);
  });

  it('should return forgotPasswordAPI.reject', () => {
    initialRestorePassword.forgotPassword = {
      loading: false,
      error: true,
      response: null
    };

    expect(restorePasswordSlice.reducer(undefined, forgotPasswordAPI.rejected(null, '', '')))
      .toEqual(initialRestorePassword);
  });

  it('should return resetPassword.pending', () => {
    const request: IResetPasswordRequest = {
      password: 'new_password',
      token: 'YgaLasd'
    };

    initialRestorePassword.resetPassword = {
      loading: true,
      error: false,
      response: null
    };

    expect(restorePasswordSlice.reducer(undefined, resetPasswordAPI.pending('', request)))
      .toEqual(initialRestorePassword);
  });

  it('should return resetPassword.fulfilled', () => {
    const request: IResetPasswordRequest = {
      password: 'new_password',
      token: 'YgaLasd'
    };

    const response: IResponseWithSuccess = {
      success: true,
      message: 'success'
    };

    initialRestorePassword.resetPassword = {
      loading: false,
      error: false,
      response: null
    };

    expect(restorePasswordSlice.reducer(undefined, resetPasswordAPI.fulfilled(response, '', request)))
      .toEqual(initialRestorePassword);
  });

  it('should return resetPassword.rejected', () => {
    const request: IResetPasswordRequest = {
      password: 'new_password',
      token: 'YgaLasd'
    };

    initialRestorePassword.resetPassword = {
      loading: false,
      error: true,
      response: null
    };

    expect(restorePasswordSlice.reducer(undefined, resetPasswordAPI.rejected(null, '', request)))
      .toEqual(initialRestorePassword);
  });
});

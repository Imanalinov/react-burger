import { IUserState, userSlice } from '../user';
import { createUserAPI, getUserAPI, loginAPI, logoutAPI, updateTokenAPI } from '../../actions/user';

describe('User Slice', () => {
  let initialState: IUserState;
  const reducer = userSlice.reducer;
  const loginRequest = {
    email: 'test@test.com',
    password: '123123'
  };

  const createUserRequest = {
    email: 'test-data@yandex.ru',
    password: 'password',
    name: 'Username'
  };

  beforeEach(() => {
    initialState = {
      loading: false,
      error: false,
      user: null,
      refreshToken: null,
      accessToken: null,
      isLogged: false
    };
  });

  // LOGIN
  it('should login pending', () => {
    initialState.loading = true;

    expect(
      reducer(undefined, loginAPI.pending('', loginRequest))
    ).toEqual(initialState);
  });

  it('should login fulfilled', () => {

    initialState.user = {
      email: 'test@test.com',
      name: 'Tester'
    };
    initialState.accessToken = 'Bearer access';
    initialState.refreshToken = 'refresh';
    initialState.isLogged = true;

    expect(
      reducer(undefined, loginAPI.fulfilled(
        {
          'success': true,
          'accessToken': 'Bearer access',
          'refreshToken': 'refresh',
          'user': {
            'email': 'test@test.com',
            'name': 'Tester'
          }
        },
        '',
        loginRequest
      ))
    ).toEqual(initialState);
  });

  it('should login rejected', () => {
    initialState.error = true;

    expect(
      reducer(undefined, loginAPI.rejected(
        null,
        '',
        loginRequest
      ))
    ).toEqual(initialState);
  });

  // CREATE USER
  it('should create user pending', () => {
    initialState.loading = true;

    expect(
      reducer(undefined, createUserAPI.pending('', createUserRequest))
    ).toEqual(initialState);
  });

  it('should create user fulfilled', () => {
    initialState.user = {
      email: 'test@test.com',
      name: 'Tester'
    };
    initialState.accessToken = 'Bearer access';
    initialState.refreshToken = 'refresh';
    initialState.isLogged = true;

    expect(
      reducer(undefined, createUserAPI.fulfilled(
        {
          'success': true,
          'accessToken': 'Bearer access',
          'refreshToken': 'refresh',
          'user': {
            'email': 'test@test.com',
            'name': 'Tester'
          }
        },
        '',
        createUserRequest
      ))
    ).toEqual(initialState);
  });

  it('should create user rejected', () => {
    initialState.error = true;

    expect(
      reducer(undefined, createUserAPI.rejected(
        null,
        '',
        createUserRequest
      ))
    ).toEqual(initialState);
  });

  // UPDATE TOKEN
  it('should update token pending', () => {
    initialState.loading = true;

    expect(
      reducer(undefined, updateTokenAPI.pending(''))
    ).toEqual(initialState);
  });

  it('should update token fulfilled', () => {
    initialState.accessToken = 'Bearer access';
    initialState.refreshToken = 'refresh';

    expect(
      reducer(undefined, updateTokenAPI.fulfilled(
        {
          'success': true,
          'accessToken': 'Bearer access',
          'refreshToken': 'refresh'
        },
        ''
      ))
    ).toEqual(initialState);
  });

  it('should update token rejected', () => {
    initialState.error = true;

    expect(
      reducer(undefined, updateTokenAPI.rejected(null, ''))
    ).toEqual(initialState);
  });

  // GET USER
  it('should get user pending', () => {
    initialState.loading = true;

    expect(
      reducer(undefined, getUserAPI.pending(''))
    ).toEqual(initialState);
  });

  it('should get user fulfilled', () => {
    initialState.user = {
      email: 'test@test.com',
      name: 'Tester'
    };
    initialState.isLogged = true;

    expect(
      reducer(undefined, getUserAPI.fulfilled(
        {
          'success': true,
          'user': {
            'email': 'test@test.com',
            'name': 'Tester'
          }
        },
        ''
      ))
    ).toEqual(initialState);
  });

  it('should get user rejected', () => {
    initialState.error = true;

    expect(
      reducer(undefined, getUserAPI.rejected(null, ''))
    ).toEqual(initialState);
  });

  // LOGOUT
  it('should logout pending', () => {
    initialState.loading = true;

    expect(
      reducer(undefined, logoutAPI.pending(''))
    ).toEqual(initialState);
  });

  it('should logout fulfilled', () => {
    expect(
      reducer(undefined, logoutAPI.fulfilled(
        true,
        ''
      ))
    ).toEqual(initialState);
  });

  it('should logout rejected', () => {
    initialState.error = true;

    expect(
      reducer(undefined, logoutAPI.rejected(null, ''))
    ).toEqual(initialState);
  });
});

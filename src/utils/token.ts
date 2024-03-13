const REFRESH_TOKEN_KEY = 'refreshToken';
const ACCESS_TOKEN_KEY = 'accessToken';

export const getAccessToken = (): string => {
  try {
    return localStorage.getItem(ACCESS_TOKEN_KEY) || '';
  } catch (error) {
    throw new Error(`Не удалось получить access токен. ${error}`);
  }
};

export const setAccessToken = (token: string): boolean => {
  if (token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    return true;
  }
  throw new Error(`Пустой access токен: ${token}`);
};

export const getRefreshToken = (): string => {
  try {
    return localStorage.getItem(REFRESH_TOKEN_KEY) || '';
  } catch (error) {
    throw new Error(`Не удалось получить refresh токен. ${error}`);
  }
};

export const setRefreshToken = (token: string): boolean => {
  if (token) {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
    return true;
  }
  throw new Error(`Пустой refresh токен: ${token}`);
};

export const clearTokens = (): void => {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

export interface IUserData extends IUpdateToken{
  user: IUser;
}

export interface IUser {
  email: string;
  name: string;
}

export interface IUpdateToken {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

export interface IGetUser {
  success: true;
  user: IUser;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ICreateUserRequest extends ILoginRequest{
  name: string;
}

export interface IResetPasswordRequest {
  password: string;
  token: string;
}

export interface IResponseWithSuccess {
  success: boolean;
  message: string;
}

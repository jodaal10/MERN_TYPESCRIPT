export interface User {
    id: number;
    firstName: string;
    lastName: string;
    corporateEmail: string;
}

export interface UserLogin {
  corporateEmail: string;
  password: string;
}

export enum userActionTypes {
  REGISTER_SUCCESS = "REGISTER_SUCCESS",
  REGISTER_FAIL = "REGISTER_FAIL",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAIL = "LOGIN_FAIL",
  USER_LOADED = "USER_LOADED",
  AUTH_ERROR = "AUTH_ERROR",
  LOGOUT = "LOGOUT",
  CLEAR_PROFILE = "CLEAR_PROFILE"
}

export interface userState {
  readonly user: User;
  loading: boolean;
  isAuthenticated: boolean,
  token?: string;
}
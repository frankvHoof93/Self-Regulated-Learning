import { User } from '../../utils/interfaces/User';

export interface AuthState {
  user: User | null;
  isLogingIn: boolean;
  errorMessage: string;
};

export const USER_LOGIN_START = 'USER_LOGIN_START';
export const USER_LOGIN_SUCCES = 'USER_LOGIN_SUCCES';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const USER_LOGOUT_START = 'USER_LOGOUT_START';
export const USER_LOGOUT_SUCCES = 'USER_LOGOUT_SUCCES';
export const USER_LOGOUT_FAILURE = 'USER_LOGOUT_FAILURE';

interface UserLoginStart {
  type: typeof USER_LOGIN_START,
};

interface UserLoginSucces {
  type: typeof USER_LOGIN_SUCCES,
  data: User,
};

interface UserLoginFailure {
  type: typeof USER_LOGIN_FAILURE,
  error: any,
};

interface UserLogoutStart {
  type: typeof USER_LOGOUT_START,
};

interface UserLogoutSucces {
  type: typeof USER_LOGOUT_SUCCES,
};

interface UserLogoutFailure {
  type: typeof USER_LOGOUT_FAILURE,
  error: any,
};

export type AuthActionTypes = UserLoginStart | UserLoginSucces | UserLoginFailure | UserLogoutStart | UserLogoutSucces | UserLogoutFailure;
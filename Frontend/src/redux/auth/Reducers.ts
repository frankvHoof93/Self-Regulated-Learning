import {
  AuthState,
  AuthActionTypes,
  USER_LOGIN_START,
  USER_LOGIN_SUCCES,
  USER_LOGIN_FAILURE,
  USER_LOGOUT_START,
  USER_LOGOUT_SUCCES,
  USER_LOGOUT_FAILURE
} from './Types';

const defaultState: AuthState = {
  user: null,
  isLogingIn: false,
  errorMessage: '',
};

export function authReducer(state = defaultState, action: AuthActionTypes): AuthState {
  switch (action.type) {
    case USER_LOGIN_START:
      return {
        ...state,
        isLogingIn: true,
        errorMessage: '',
      };
    case USER_LOGIN_SUCCES:
      return {
        ...state,
        user: action.data,
        isLogingIn: false,
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        isLogingIn: false,
        errorMessage: action.error,
      };
    case USER_LOGOUT_START:
      return {
        ...state
      };
    case USER_LOGOUT_SUCCES:
      return {
        ...state,
        user: null,
      };
    case USER_LOGOUT_FAILURE:
      return {
        ...state,
        errorMessage: action.error,
      };
    default:
      return state;
  };
};
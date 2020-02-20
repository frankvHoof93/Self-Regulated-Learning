
import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import { ActionCreator } from 'redux';
import {
  AuthActionTypes,
  USER_LOGIN_START,
  USER_LOGIN_SUCCES,
  USER_LOGIN_FAILURE,
  USER_LOGOUT_START,
  USER_LOGOUT_SUCCES,
  USER_LOGOUT_FAILURE
} from './Types';

import { User } from '../../utils/interfaces/User';

const userLoginStart = (): AuthActionTypes => {
  return {
    type: USER_LOGIN_START,
  };
};

const userLoginSucces = (data: User): AuthActionTypes => {
  return {
    type: USER_LOGIN_SUCCES,
    data
  };
};

const userLoginFailure = (error: any): AuthActionTypes => {
  return {
    type: USER_LOGIN_FAILURE,
    error
  };
};

const userLogoutStart = (): AuthActionTypes => {
  return {
    type: USER_LOGOUT_START,
  };
};

const userLogoutSucces = (): AuthActionTypes => {
  return {
    type: USER_LOGOUT_SUCCES,
  };
};

const userLogoutFailure = (error: any): AuthActionTypes => {
  return {
    type: USER_LOGOUT_FAILURE,
    error
  };
};

// Thunk actions
export const LoginUser: ActionCreator<ThunkAction<
  // The type of the last action to be dispatched - will always be promise<T> for async actions
  Promise<any>,
  // The type for the data within the last action
  null,
  // The type of the parameter for the nested function
  void,
  // The type of the last action to be dispatched
  any
>> = (user: User) => {
  return async (dispatch: Dispatch<any>) => {

    dispatch(userLoginStart());
    // call to login user

    // eslint-disable-next-line no-constant-condition
    if (true)
      // then
      dispatch(userLoginSucces(user));

    else
      // catch
      dispatch(userLoginFailure('failed to load users'));
  };
};

export const logoutUser: ActionCreator<ThunkAction<
  // The type of the last action to be dispatched - will always be promise<T> for async actions
  Promise<any>,
  // The type for the data within the last action
  null,
  // The type of the parameter for the nested function
  void,
  // The type of the last action to be dispatched
  any
>> = () => {
  return async (dispatch: Dispatch<any>) => {

    dispatch(userLogoutStart());
    // Logic to logout user

    // eslint-disable-next-line no-constant-condition
    if (true)
      // then
      dispatch(userLogoutSucces());

    else
      // catch
      dispatch(userLogoutFailure('failed to logout user'));
  };
};

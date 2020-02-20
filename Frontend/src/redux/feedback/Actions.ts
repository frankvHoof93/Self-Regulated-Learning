import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import { ActionCreator } from 'redux';
import { AxiosResponse } from 'axios';

import {
  FeedbackActionTypes,
  FETCH_FEEDBACK_START,
  FETCH_FEEDBACK_SUCCES,
  FETCH_FEEDBACK_FAILURE,
} from './Types';

import { Feedback } from '../../utils/interfaces/Feedback';
import { API } from '../../utils/api/api';

const fetchFeedbackStart = (): FeedbackActionTypes => {
  return {
    type: FETCH_FEEDBACK_START,
  };
};

const fetchFeedbackSucces = (data: Feedback[]): FeedbackActionTypes => {
  return {
    type: FETCH_FEEDBACK_SUCCES,
    data
  };
};

const fetchFeedbackFailure = (error: any): FeedbackActionTypes => {
  return {
    type: FETCH_FEEDBACK_FAILURE,
    error
  };
};

// Thunk actions

export const fetchFeedback: ActionCreator<ThunkAction<
  // The type of the last action to be dispatched - will always be promise<T> for async actions
  Promise<any>,
  // The type for the data within the last action
  null,
  // The type of the parameter for the nested function
  void,
  // The type of the last action to be dispatched
  any
>> = (studentId: number) => {
  return async (dispatch: Dispatch<any>) => {
    dispatch(fetchFeedbackStart());
    API.Feedback.get(studentId)
      .then((response: AxiosResponse) => {
        console.log(response.data);
        dispatch(fetchFeedbackSucces(response.data));
      })
      .catch((error: any) => {
        dispatch(fetchFeedbackFailure(error));
      })
  };
};

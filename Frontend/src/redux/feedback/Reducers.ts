import {
  FeedbackState,
  FeedbackActionTypes,
  FETCH_FEEDBACK_START,
  FETCH_FEEDBACK_SUCCES,
  FETCH_FEEDBACK_FAILURE,
} from './Types';

import FeedbackMock from '../../utils/mock/FeedbackMock'

const defaultState: FeedbackState = {
  isFetching: false,
  feedback: [],
  errorMessage: '',
};

export function feedbackReducer(state = defaultState, action: FeedbackActionTypes): FeedbackState {
  switch (action.type) {
    case FETCH_FEEDBACK_START:
      return {
        ...state,
        isFetching: true,
        errorMessage: '',
      };
    case FETCH_FEEDBACK_SUCCES:
      return {
        isFetching: false,
        feedback: action.data,
        errorMessage: '',
      };
    case FETCH_FEEDBACK_FAILURE:
      console.log('setting mock data to feedback redux state')
      return {
        ...state,
        isFetching: false,
        errorMessage: action.error,
        feedback: FeedbackMock,
      };
    default:
      return state;
  };
};
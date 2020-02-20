import { Feedback } from '../../utils/interfaces/Feedback';

export interface FeedbackState {
  isFetching: boolean;
  feedback: Feedback[];
  errorMessage: string;
};

export const FETCH_FEEDBACK_START = 'FETCH_FEEDBACK_START';
export const FETCH_FEEDBACK_SUCCES = 'FETCH_FEEDBACK_SUCCES';
export const FETCH_FEEDBACK_FAILURE = 'FETCH_FEEDBACK_FAILURE';

interface FetchFeedbackStart {
  type: typeof FETCH_FEEDBACK_START,
};

interface FetchFeedbackSucces {
  type: typeof FETCH_FEEDBACK_SUCCES;
  data: Feedback[];
};

interface FetchFeedbackFailure {
  type: typeof FETCH_FEEDBACK_FAILURE,
  error: any;
};

export type FeedbackActionTypes = FetchFeedbackStart | FetchFeedbackSucces | FetchFeedbackFailure;
import {
  NavigationState,
  NavigationActionTypes,
  ROUTER_LOCATION_CHANGE
} from './Types';

const defaultState: NavigationState = {
  page: '/',
};

export function navigationReducer(state = defaultState, action: NavigationActionTypes): NavigationState {
  switch (action.type) {
      case ROUTER_LOCATION_CHANGE:
          return {
              ...state,
              page: action.payload.location.hash.split('#/').pop(),
          };
      default:
          return state;
  };
};
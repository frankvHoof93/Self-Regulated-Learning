import {
  NavigationActionTypes,
  ROUTER_LOCATION_CHANGE
} from './Types';

export const navigationLocationChange = (payload: {}): NavigationActionTypes => {
  return {
      type: ROUTER_LOCATION_CHANGE,
      payload
  };
};
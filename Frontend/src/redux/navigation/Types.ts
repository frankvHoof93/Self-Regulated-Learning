export interface NavigationState {
  page: any;
};

export const ROUTER_LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

interface RouterLocationChange {
  type: typeof ROUTER_LOCATION_CHANGE,
  payload: any,
};

export type NavigationActionTypes = RouterLocationChange;
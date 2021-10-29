import { Hostel } from './hostel';

export enum ActionType {
  ChangeCityAction = 'changCityAction',
  ChangeHostelsAction = 'changHostelsAction',
  ChangeSortingAction = 'changSortingAction',
  ChangeHoverHostelgAction = 'hover/changHoverHostelAction',
  ChangeHoverMarkerAction = 'hover/changeHoverMarkerAction',
}

export type ChangeCity = {
  type: ActionType.ChangeCityAction,
  city: string,
};

export type ChangeHostels = {
  type: ActionType.ChangeHostelsAction,
  hostels: Hostel[],
};

export type ChangeSorting = {
  type: ActionType.ChangeSortingAction,
  sorting: string,
};

export type ChangeHoverHostel = {
  type: ActionType.ChangeHoverHostelgAction,
  hostelId: number | undefined,
};

export type ChangeHoverMarker = {
  type: ActionType.ChangeHoverMarkerAction,
  markerId: number | undefined,
};


export type Actions = ChangeCity | ChangeHostels | ChangeSorting | ChangeHoverHostel | ChangeHoverMarker;

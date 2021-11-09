import { AuthorizationStatus, DEFAULT_ACTIVE_CITY, DEFAULT_ACTIVE_SORT } from '../const';
import { Actions, ActionType } from '../types/action';
import { State } from '../types/state';
import { sortHostels } from '../utils/common';

export const initialState = {
  city: DEFAULT_ACTIVE_CITY,
  sorting: DEFAULT_ACTIVE_SORT,
  hostels: [],
  filteredHostels: [],
  nearbyHostels: [],
  favorites: [],
  comments: [],
  hoverHostel: undefined,
  hoverMarker: undefined,
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: true,
};

export function reducer(state: State = initialState, action: Actions):State {
  switch (action.type) {
    case ActionType.ChangeCityAction:
      return {...state, city: action.city, filteredHostels: state.hostels
        .filter((hostel) =>
          hostel.city.name.toLowerCase() === action.city.toLowerCase()),
      };
    case ActionType.ChangeHostelsAction:
      return {...state, hostels: action.hostels, filteredHostels: action.hostels
        .filter((hostel) =>
          hostel.city.name.toLowerCase() === state.city.toLowerCase()),
      };
    case ActionType.ChangeSortingAction:
      return {...state, sorting: action.sorting, hostels: sortHostels(state.hostels,action.sorting, state.city)};
    case ActionType.ChangeHoverHostelgAction:
      return {...state, hoverHostel: action.hostelId};
    case ActionType.ChangeHoverMarkerAction:
      return {...state, hoverMarker: action.markerId};
    case ActionType.ChangeAuthorizationStatusAction:
      return {...state, authorizationStatus: action.authorizationStatus};
    case ActionType.ChangeLoaderStatusAction:
      return {...state, isDataLoaded: action.isDataLoaded};
    default:
      return state;
  }
}

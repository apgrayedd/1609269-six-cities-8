import { DEFAULT_ACTIVE_CITY, DEFAULT_ACTIVE_SORT } from '../const';
import { hostels } from '../mocks/hostels';
import { Actions, ActionType } from '../types/action';
import { State } from '../types/state';
import { sortHostels } from '../utils/common';

export const initialState = {
  city: DEFAULT_ACTIVE_CITY,
  sorting: DEFAULT_ACTIVE_SORT,
  hostels: sortHostels(hostels.filter((hostel) =>
    (hostel.city.name.toLowerCase() === DEFAULT_ACTIVE_CITY.toLowerCase())),DEFAULT_ACTIVE_SORT),
  hoverHostel: undefined,
  hoverMarker: undefined,
};

export function reducer(state: State = initialState, action: Actions):State {
  switch (action.type) {
    case ActionType.ChangeCityAction:
      return {...state, city: action.city, hostels: hostels
        .filter((hostel) =>
          hostel.city.name.toLowerCase() === action.city.toLowerCase()),
      };
    case ActionType.ChangeHostelsAction:
      return {...state, hostels: action.hostels};
    case ActionType.ChangeSortingAction:
      return {...state, sorting: action.sorting, hostels: sortHostels(hostels.filter((hostel) =>
        (hostel.city.name.toLowerCase() === state.city.toLowerCase())),action.sorting),
      };
    case ActionType.ChangeHoverHostelgAction:
      return {...state, hoverHostel: action.hostelId};
    case ActionType.ChangeHoverMarkerAction:
      return {...state, hoverMarker: action.markerId};
    default:
      return state;
  }
}

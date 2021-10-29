import { DEFAULT_ACTIVE_CITY, DEFAULT_ACTIVE_SORT, SortingList } from '../const';
import { hostels } from '../mocks/hostels';
import { Actions, ActionType } from '../types/action';
import { State } from '../types/state';

export const initialState = {
  city: DEFAULT_ACTIVE_CITY,
  sorting: DEFAULT_ACTIVE_SORT,
  hostels: hostels
    .filter((hostel) =>
      (hostel.city.name.toLowerCase() === DEFAULT_ACTIVE_CITY.toLowerCase()))
    .sort(SortingList.filter(({name}) => name === DEFAULT_ACTIVE_SORT)[0].funct),
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
      return {...state, sorting: action.sorting, hostels: hostels
        .sort(SortingList.filter(({name}) => name === action.sorting)[0].funct),
      };
    case ActionType.ChangeHoverHostelgAction:
      return {...state, hoverHostel: action.hostelId};
    case ActionType.ChangeHoverMarkerAction:
      return {...state, hoverMarker: action.markerId};
    default:
      return state;
  }
}

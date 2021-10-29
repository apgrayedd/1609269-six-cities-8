import { ActionType, ChangeCity, ChangeHostels, ChangeHoverHostel, ChangeHoverMarker, ChangeSorting } from '../types/action';
import { Hostel } from '../types/hostel';

export const changeCityAction = (city: string):ChangeCity => ({
  type: ActionType.ChangeCityAction,
  city: city,
});

export const changeHostelsAction = (hostels: Hostel[]):ChangeHostels => ({
  type: ActionType.ChangeHostelsAction,
  hostels: hostels,
});

export const changeSortingAction = (sorting: string):ChangeSorting => ({
  type: ActionType.ChangeSortingAction,
  sorting: sorting,
});

export const changeHoverHostelAction = (hostelId: number | undefined):ChangeHoverHostel => ({
  type: ActionType.ChangeHoverHostelgAction,
  hostelId: hostelId,
});

export const changeHoverMarkerAction = (markerId: (number | undefined)[] | number | undefined):ChangeHoverMarker => ({
  type: ActionType.ChangeHoverMarkerAction,
  markerId: markerId,
});

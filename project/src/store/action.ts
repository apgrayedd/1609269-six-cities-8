import { AuthorizationStatus } from '../const';
import { ActionType} from '../types/action';
import { Hostel } from '../types/hostel';

export const changeCity = (city: string) => ({
  type: ActionType.ChangeCityAction,
  city: city,
} as const);

export const changeHostels = (hostels: Hostel[]) => ({
  type: ActionType.ChangeHostelsAction,
  hostels: hostels,
} as const);

export const changeSorting = (sorting: string) => ({
  type: ActionType.ChangeSortingAction,
  sorting: sorting,
} as const);

export const changeHoverHostel = (hostelId: number | undefined) => ({
  type: ActionType.ChangeHoverHostelgAction,
  hostelId: hostelId,
} as const);

export const changeHoverMarker = (markerId: number | undefined) => ({
  type: ActionType.ChangeHoverMarkerAction,
  markerId: markerId,
} as const);

export const changeAuthorizationStatus = (authorizationStatus: AuthorizationStatus) => ({
  type: ActionType.ChangeAuthorizationStatusAction,
  authorizationStatus: authorizationStatus,
} as const);

export const changeLoaderStatus = (isDataLoaded: boolean) => ({
  type: ActionType.ChangeLoaderStatusAction,
  isDataLoaded: isDataLoaded,
} as const);

export const changeFavorites = (favorites: Hostel[]) => ({
  type: ActionType.ChangeFavoritesAction,
  favorites: favorites,
} as const);

export const changeHostelProperty = (hostelProperty: Hostel | undefined) => ({
  type: ActionType.ChangeHostelPropertyAction,
  hostelProperty: hostelProperty,
} as const);

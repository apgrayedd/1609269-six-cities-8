import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';
import { ActionType} from '../types/action';
import { Comment } from '../types/comment';
import { Hostel } from '../types/hostel';

export const changeCity = createAction(
  ActionType.ChangeCityAction,
  (city:string) => ({
    payload: city,
  }),
);

export const changeLoaderStatus = createAction(
  ActionType.ChangeLoaderStatusAction,
  (isDataLoading: boolean) => ({
    payload: isDataLoading,
  }),
);

export const changeHostelProperty = createAction(
  ActionType.ChangeHostelPropertyAction,
  (hostelProperty:Hostel | undefined) => ({
    payload: hostelProperty,
  }),
);

export const changeCommentsProperty = createAction(
  ActionType.ChangeCommentsPropertyAction,
  (comments: Comment[]) => ({
    payload: comments,
  }),
);

export const changeNearbyHostelsProperty = createAction(
  ActionType.ChangeNearbyHostelsAction,
  (hostels: Hostel[]) => ({
    payload: hostels,
  }),
);

export const changeHostels = createAction(
  ActionType.ChangeHostelsAction,
  (hostels: Hostel[]) => ({
    payload: hostels,
  }),
);

export const addCommentProperty = createAction(
  ActionType.AddCommentPropertyAction,
  (comment: Comment) => ({
    payload: comment,
  }),
);

export const changeSorting = createAction(
  ActionType.ChangeSortingAction,
  (sorting: string) => ({
    payload: sorting,
  }),
);

export const changeHoverHostel = createAction(
  ActionType.ChangeHoverHostelAction,
  (hostelId: undefined | number) => ({
    payload: hostelId,
  }),
);

export const changeHoverMarker = createAction(
  ActionType.ChangeHoverMarkerAction,
  (markerId: undefined | number) => ({
    payload: markerId,
  }),
);

export const changeAuthorizationStatus = createAction(
  ActionType.ChangeAuthorizationStatusAction,
  (authorizationStatus: AuthorizationStatus) => ({
    payload: authorizationStatus,
  }),
);

export const changeFavorites = createAction(
  ActionType.ChangeFavoritesAction,
  (favorites: Hostel[]) => ({
    payload: favorites,
  }),
);

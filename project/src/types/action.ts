import { ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import {
  changeCity,
  changeHostels,
  changeSorting,
  changeHoverHostel,
  changeHoverMarker,
  changeAuthorizationStatus,
  changeLoaderStatus,
  changeFavorites,
  changeHostelProperty,
  changeCommentsProperty,
  changeNearbyHostelsProperty,
  addCommentProperty
} from '../store/action';
import { Comment } from './comment';
import { Hostel } from './hostel';
import { State } from './state';

export enum ActionType {
  ChangeHostelsAction = 'data/changHostelsAction',
  ChangeLoaderStatusAction = 'data/changeLoaderStatus',
  ChangeFavoritesAction = 'data/changeFavoritesAction',
  ChangeHostelPropertyAction = 'data/changeHostelPropertyAction',
  ChangeCommentsPropertyAction = 'data/changeCommentsPropertyAction',
  ChangeNearbyHostelsAction = 'data/changeNearbyHostelsAction',
  AddCommentPropertyAction = 'data/addCommentPropertyAction',
  ChangeCityAction = 'data/changCityAction',
  ChangeSortingAction = 'changSortingAction',
  ChangeHoverHostelgAction = 'hover/changHoverHostelAction',
  ChangeHoverMarkerAction = 'hover/changeHoverMarkerAction',
  ChangeAuthorizationStatusAction = 'user/changeAuthorizationStatus',
}

export type ThunkActionResultHostels<R = Promise<Hostel[]>> = ThunkAction<R, State, AxiosInstance, Actions>;
export type ThunkActionResultComments<R = Promise<Comment[]>> = ThunkAction<R, State, AxiosInstance, Actions>;
export type ThunkActionResultHostel<R = Promise<Hostel>> = ThunkAction<R, State, AxiosInstance, Actions>;
export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;

export type Actions =
  ReturnType<typeof changeCity> |
  ReturnType<typeof changeHostels> |
  ReturnType<typeof changeSorting> |
  ReturnType<typeof changeHoverHostel> |
  ReturnType<typeof changeHoverMarker> |
  ReturnType<typeof changeAuthorizationStatus> |
  ReturnType<typeof changeLoaderStatus> |
  ReturnType<typeof changeFavorites> |
  ReturnType<typeof changeHostelProperty> |
  ReturnType<typeof changeCommentsProperty> |
  ReturnType<typeof changeNearbyHostelsProperty> |
  ReturnType<typeof addCommentProperty>

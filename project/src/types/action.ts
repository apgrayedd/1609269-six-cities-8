import { Action, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
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
  ChangeHoverHostelAction = 'hover/changHoverHostelAction',
  ChangeHoverMarkerAction = 'hover/changeHoverMarkerAction',
  ChangeAuthorizationStatusAction = 'user/changeAuthorizationStatus',
}

export type ThunkActionResultHostels<R = Promise<Hostel[]>> = ThunkAction<R, State, AxiosInstance, Action>;
export type ThunkActionResultComments<R = Promise<Comment[]>> = ThunkAction<R, State, AxiosInstance, Action>;
export type ThunkActionResultHostel<R = Promise<Hostel>> = ThunkAction<R, State, AxiosInstance, Action>;
export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;

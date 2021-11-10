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
  changeHostelProperty
} from '../store/action';
import { Hostel } from './hostel';
import { State } from './state';

export enum ActionType {
  ChangeHostelsAction = 'data/changHostelsAction',
  ChangeLoaderStatusAction = 'data/changeLoaderStatus',
  ChangeFavoritesAction = 'data/changeFavoritesAction',
  ChangeHostelPropertyAction = 'data/changeHostelPropertyAction',
  ChangeCityAction = 'changCityAction',
  ChangeSortingAction = 'changSortingAction',
  ChangeHoverHostelgAction = 'hover/changHoverHostelAction',
  ChangeHoverMarkerAction = 'hover/changeHoverMarkerAction',
  ChangeAuthorizationStatusAction = 'user/changeAuthorizationStatus',
}

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
  ReturnType<typeof changeHostelProperty>

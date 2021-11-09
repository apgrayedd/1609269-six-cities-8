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
  changeFavorites
} from '../store/action';
import { State } from './state';

export enum ActionType {
  ChangeHostelsAction = 'data/changHostelsAction',
  ChangeLoaderStatusAction = 'data/changeLoaderStatus',
  ChangeFavoritesAction = 'data/changeFavoritesAction',
  ChangeCityAction = 'changCityAction',
  ChangeSortingAction = 'changSortingAction',
  ChangeHoverHostelgAction = 'hover/changHoverHostelAction',
  ChangeHoverMarkerAction = 'hover/changeHoverMarkerAction',
  ChangeAuthorizationStatusAction = 'user/changeAuthorizationStatus',
}

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
  ReturnType<typeof changeFavorites>

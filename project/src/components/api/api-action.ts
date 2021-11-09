/* eslint-disable semi */
/* eslint-disable no-console */
import { APIRoute, AuthorizationStatus } from '../../const';
import { changeAuthorizationStatus, changeHostels, changeLoaderStatus } from '../../store/action';
import { ThunkActionResult } from '../../types/action';
import { AuthData } from '../../types/auth-data';
import { Hostel } from '../../types/hostel';
import { dropToken, saveToken, Token } from './token';

export const fetchHostelAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Hostel[]>(APIRoute.Hotels);
    dispatch(changeHostels(data));
    dispatch(changeLoaderStatus(false));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get(APIRoute.Login)
      .then(() => {
        dispatch(changeAuthorizationStatus(AuthorizationStatus.Auth));
      });
  };

export const loginAction = ({login: email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data: {token}} = await api.post<{token: Token}>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(changeAuthorizationStatus(AuthorizationStatus.Auth));
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(changeAuthorizationStatus(AuthorizationStatus.NoAuth));
  };

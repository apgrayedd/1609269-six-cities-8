import { APIRoute, AuthorizationStatus } from '../../const';
import {
  changeAuthorizationStatus,
  changeFavorites,
  changeHostels,
  changeLoaderStatus
} from '../../store/action';
import {
  ThunkActionResult,
  ThunkActionResultComments,
  ThunkActionResultHostel,
  ThunkActionResultHostels
} from '../../types/action';
import { AuthData } from '../../types/auth-data';
import { Comment, PostComment } from '../../types/comment';
import { Hostel } from '../../types/hostel';
import { dropToken, saveToken, Token } from './token';

export const fetchHostelAction = (loading: boolean): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    loading && dispatch(changeLoaderStatus(true));
    const {data} = await api.get<Hostel[]>(APIRoute.Hotels);
    dispatch(changeHostels(data));
    dispatch(changeLoaderStatus(false));
    loading && dispatch(changeLoaderStatus(false));
  };

export const fetchOfferInfo = (id: number): ThunkActionResultHostel =>
  async (dispacth, _getstate, api): Promise<Hostel> => {
    const {data} = await api.get<Hostel>(APIRoute.OfferInfo.replace('id', `${id}`));
    return Promise.resolve(data);
  };

export const fetchCommentsInfo = (id: number): ThunkActionResultComments =>
  async (dispacth, _getstate, api): Promise<Comment[]> => {
    const {data} = await api.get<Comment[]>(APIRoute.Comments.replace('id', `${id}`));
    return Promise.resolve(data);
  };

export const fetchNearByHostelsInfo = (id: number): ThunkActionResultHostels =>
  async (dispacth, _getstate, api): Promise<Hostel[]> => {
    const {data} = await api.get<Hostel[]>(APIRoute.NearbyHostels.replace('id', `${id}`));
    return Promise.resolve(data);
  };

export const fetchFavoritesInfo = (loading: boolean): ThunkActionResult =>
  async (dispatch, _getstate, api): Promise<void> => {
    loading && dispatch(changeLoaderStatus(true));
    const {data} = await api.get<Hostel[]>(APIRoute.Favorites);
    dispatch(changeFavorites(data));
    loading && dispatch(changeLoaderStatus(false));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get(APIRoute.Login);
    dispatch(changeAuthorizationStatus(AuthorizationStatus.Auth));
  };

export const postCommentAction = (id: number, comment: PostComment): ThunkActionResult =>
  async (dispacth, _getstate, api): Promise<void> => {
    await api.post(APIRoute.Comments.replace('id', `${id}`), comment);
    return Promise.resolve();
  };

export const postFavoritesStatusAction = (id: number, status: 0 | 1): ThunkActionResult =>
  async (dispacth, _getstate, api): Promise<void> => {
    await api.post(APIRoute.PostFavorites.replace('id', `${id}`).replace('status', `${status}`));
    return Promise.resolve();
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

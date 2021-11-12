import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/app/app';
import {composeWithDevTools} from 'redux-devtools-extension';
import { reducer } from './store/reducer';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import { createAPI } from './components/api/api';
import {
  changeAuthorizationStatus,
  changeCommentsProperty,
  changeFavorites,
  changeHostelProperty,
  changeLoaderStatus,
  changeNearbyHostelsProperty
} from './store/action';
import { AuthorizationStatus } from './const';
import { ThunkAppDispatch } from './types/action';
import {
  checkAuthAction,
  fetchCommentsInfo,
  fetchFavoritesInfo,
  fetchHostelAction,
  fetchNearByHostelsInfo,
  fetchOfferInfo,
  loginAction,
  postCommentAction,
  postFavoritesStatusAction
} from './components/api/api-action';
import { AuthData } from './types/auth-data';
import { Hostel } from './types/hostel';
import { Comment, PostComment } from './types/comment';

const api = createAPI(
  () => store.dispatch(changeAuthorizationStatus(AuthorizationStatus.NoAuth)),
);
const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk.withExtraArgument(api),
  )));

(store.dispatch as ThunkAppDispatch)(checkAuthAction());
(store.dispatch as ThunkAppDispatch)(fetchHostelAction());

type LoginFromIndex = AuthData & {
  action: () => void,
};

type Id = number;

export const getHostels = ():Promise<void> =>
  (store.dispatch as ThunkAppDispatch)(fetchHostelAction())
    .then(() => Promise.resolve())
    .catch((err) => Promise.reject(err));

export const getFavorites = (actionOnError:()=> void):Promise<void> =>
  (store.dispatch as ThunkAppDispatch)(fetchFavoritesInfo())
    .then((favorites) => {
      store.dispatch(changeFavorites(favorites));
      actionOnError();
    })
    .then(() => Promise.resolve())
    .catch((err) => Promise.reject(err));

export const getComments = (id:Id):Promise<void> =>
  (store.dispatch as ThunkAppDispatch)(fetchCommentsInfo(id))
    .then((comments:Comment[]) => {store.dispatch(changeCommentsProperty(comments));})
    .catch((err) => Promise.reject(err));

export const getNearbyHostels = (id:Id):Promise<void> =>
  (store.dispatch as ThunkAppDispatch)(fetchNearByHostelsInfo(id))
    .then((hostels:Hostel[]) => {store.dispatch(changeNearbyHostelsProperty(hostels));})
    .catch((err) => Promise.reject(err));

export const getOfferInfo = (id:Id, action:()=> void, actionOnError:()=> void):Promise<void> =>
  (store.dispatch as ThunkAppDispatch)(fetchOfferInfo(id))
    .then((offerInfo:Hostel) => {
      store.dispatch(changeLoaderStatus(true));
      store.dispatch(changeHostelProperty(offerInfo));
      action();
    })
    .then(() => getComments(id))
    .then(() => getNearbyHostels(id))
    .then(() => {store.dispatch(changeLoaderStatus(false));})
    .then(() => Promise.resolve())
    .catch(() => actionOnError());

export const postlogin = ({login, password, action}:LoginFromIndex):Promise<void> =>
  (store.dispatch as ThunkAppDispatch)(loginAction({login: login, password: password}))
    .then(() => {
      store.dispatch(changeLoaderStatus(true));
      action();
      store.dispatch(changeLoaderStatus(false));
    })
    .catch((err) => Promise.reject(err));

export const postComment = (id:Id, {comment, rating}:PostComment):Promise<void> =>
  (store.dispatch as ThunkAppDispatch)(postCommentAction(id, {comment, rating}))
    .then(() => getComments(id))
    .then(() => Promise.resolve())
    .catch((err) => Promise.reject(err));

export const postFavoritesStatus = (id:Id, status: 0 | 1, onError: () => void):Promise<void> =>
  (store.dispatch as ThunkAppDispatch)(postFavoritesStatusAction(id, status))
    .then(() => getHostels())
    .then(() => Promise.resolve())
    .catch(() => onError());

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));

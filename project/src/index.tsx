import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/app/app';
import {composeWithDevTools} from 'redux-devtools-extension';
import { comments } from './mocks/comments';
import { reducer } from './store/reducer';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import { createAPI } from './components/api/api';
import { changeAuthorizationStatus, changeHostelProperty, changeLoaderStatus } from './store/action';
import { AuthorizationStatus } from './const';
import { ThunkAppDispatch } from './types/action';
import {
  checkAuthAction,
  fetchHostelAction,
  fetchOfferInfo,
  loginAction
} from './components/api/api-action';
import { AuthData } from './types/auth-data';
import { Hostel } from './types/hostel';

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

export const loginFromIndex = ({login, password, action}:LoginFromIndex):Promise<void>=>
  (store.dispatch as ThunkAppDispatch)(loginAction({login: login, password: password}))
    .then(() => {
      store.dispatch(changeLoaderStatus(true));
      action();
      store.dispatch(changeLoaderStatus(false));
    })
    .catch((err) => Promise.reject(err));

export const OfferInfoFromIndex = (id: Id):Promise<void> =>
  (store.dispatch as ThunkAppDispatch)(fetchOfferInfo(id))
    .then((offerInfo:Hostel) => {
      store.dispatch(changeLoaderStatus(true));
      store.dispatch(changeHostelProperty(offerInfo));
      store.dispatch(changeLoaderStatus(false));
    })
    .catch((err) => Promise.reject(err));

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App
        comments = {comments}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));

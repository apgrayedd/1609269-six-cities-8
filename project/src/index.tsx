/* eslint-disable no-console */
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
import { changeAuthorizationStatus } from './store/action';
import { AuthorizationStatus } from './const';
import { ThunkAppDispatch } from './types/action';
import {
  checkAuthAction,
  fetchHostelAction } from './components/api/api-action';

const api = createAPI(
  () => store.dispatch(changeAuthorizationStatus(AuthorizationStatus.NoAuth)),
);
const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk.withExtraArgument(api),
  )));

(store.dispatch as ThunkAppDispatch)(checkAuthAction());
(store.dispatch as ThunkAppDispatch)(fetchHostelAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App
        comments = {comments}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
